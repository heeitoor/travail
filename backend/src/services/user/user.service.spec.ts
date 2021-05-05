import { Test, TestingModule } from "@nestjs/testing";
import { User } from "src/entities/user";
import { UserRecover } from "src/entities/user-recover";
import { MailService } from "src/shared/mail";
import { UserRepository } from "../../repositories/user.repository";
import { UserRecoverRepository } from "../../repositories/user-recover.repository";
import { UserService } from "./user.service";
import { sha256 } from "js-sha256";

const userRepository = {
  getById: (): Promise<User> => {
    return new Promise<User>((res, rej) => {
      res({ name: "test user" } as User);
    });
  },
  getAll: (): Promise<User[]> => {
    return new Promise<User[]>((res, rej) => {
      res([{ name: "test user 01" }, { name: "test user 02" }] as User[]);
    });
  },
  add: (entity: User): Promise<number> => {
    return new Promise<number>((res, rej) => {
      res(99);
    });
  },
  update: (entity: User): Promise<void> => {
    return new Promise<void>((res, rej) => {
      res();
    });
  },
  delete: (id: number): Promise<void> => {
    return new Promise<void>((res, rej) => {
      res();
    });
  },
  existsByEmail: (email: string) => {
    return false;
  },
};

const userRecoverRepository = {
  add: (entity: UserRecover) => {},
  delete: (id: number) => {},
  getByConfirmationCode: (confirmationCode: string) => {},
};

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: UserRecoverRepository,
          useValue: userRecoverRepository,
        },
        {
          provide: MailService,
          useValue: {
            send: () => {},
          },
        },
        {
          provide: sha256(""),
          useValue: () => "",
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should get user", async () => {
    const user = await service.getById(0);
    expect(user.name).toBe("test user");
  });

  it("should get all users", async () => {
    const users = await service.getAll();
    expect(users.length).toBeGreaterThanOrEqual(2);
  });

  it("should add user", async () => {
    const spy = jest.spyOn(userRepository, "add");

    await service.add({ password: "test" } as User);

    expect(spy).toHaveBeenCalled();
  });

  it("should update user", async () => {
    const spy = jest.spyOn(userRepository, "update");

    await service.update({} as User);

    expect(spy).toHaveBeenCalled();
  });

  it("should delete user", async () => {
    const spy = jest.spyOn(userRepository, "delete");

    await service.delete(0);

    expect(spy).toHaveBeenCalled();
  });
});
