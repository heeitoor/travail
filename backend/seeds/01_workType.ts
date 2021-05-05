import { Knex } from 'knex';
import * as axios from 'axios';
import { groupBy, first } from 'lodash';

export async function seed(knex: Knex): Promise<void> {
  const { data } = await axios.default.get('https://servicodados.ibge.gov.br/api/v2/cnae/classes');
  const items = data.map((x) => {
    return { id: x.id, parentId: x.grupo.id, parentName: x.grupo.descricao, name: x.descricao };
  });

  const grouped = groupBy(items, (x) => x.parentId);
  const workTypes = [];
  let idAux = 1;

  for (const key in grouped) {
    const { parentName } = first(grouped[key]);
    const parent = { id: idAux, workTypeId: null, name: parentName, cnae: key };
    workTypes.push(parent);
    idAux++;
    grouped[key].forEach(({ id, name }) => {
      workTypes.push({ id: idAux, workTypeId: parent.id, name, cnae: id });
      idAux++;
    });
  }

  await knex('work_type').del();
  await knex('work_type').insert(workTypes);  
  await knex.raw(`ALTER SEQUENCE work_type_id_seq RESTART WITH ${workTypes.length + 1}`);
}
