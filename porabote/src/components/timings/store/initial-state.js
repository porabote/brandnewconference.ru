const initialState = {
  title: "Расписание",
  event_ids: [],
  alias: "timings",
  data: [],
  meta: {
    count: 0, // total count of records
    limit: 50,
    offset: 0,
    nextPage: 1,
    perPage: 0, // total count of loaded records
    lastId: 0,
  },
  filter: {
    where: {
      department_id: '',
      status: '',
      account_id: '',
    },
    orWhereGrouped: [
      {
        name: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
        post_name: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
      }
    ],
    whereIn: {
      department_id: [],
    },
    seekString: "",
  },
  dictsRequired: [
     "speakers",
  ],
  relationships: [

  ],
};

export default initialState;