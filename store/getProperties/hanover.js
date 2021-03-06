export const state = () => ({
  properties: [],
  lastVisible: null,
  loading: true,
  paginateNext: {
    disabled: false,
    dark: true
  },
  paginateNextSearched: {
    disabled: false,
    dark: true
  },


});

export const getters = {
  properties: state => state.properties,
  loading: state => state.loading,
  lastVisible: state => state.lastVisible,
  paginateNext: state => state.paginateNext,
};

export const actions = {
  getParishProperties({ commit, state }) {
    // console.log("getTheProperty");

    // console.log("Get User: User");

    // console.log(`Properties: ${state.properties.length}`);

    // console.log("lastVisible");
    // console.log(state.lastVisible);

    const ref = this.$fire.firestore
    .collection("properties")
      .where("details.parish", "==", "Hanover")
      .orderBy("timestamp.created", "desc")
      .startAfter(state.lastVisible || {})
      .limit(8);

    ref.get().then(
      querySnapshot => {
        commit(
          "SET_LAST_VISIBLE",
          Object.freeze(querySnapshot.docs[querySnapshot.docs.length - 1])
        );
        // console.log("lastVisible_2");
        // console.log(state.lastVisible);

        if (querySnapshot.empty) {
          // console.log("Empty");

          commit("SET_PAGINATE_NEXT");
        }
        if (querySnapshot.empty && state.properties.length) {
          commit(
            "snackbars/errors/LOG_ERROR",
            "Looks like we've run out of properties to show you.",
            {
              root: true
            }
          );
        }

        querySnapshot.forEach(doc => {
          // console.log(`This Document was fetched ${doc.id}`);
          commit("SET_PROPERTIES", [doc.data(), doc.id]);
        });

        commit("LOADING", false);

        //    this.loading = false;

        if (state.properties === []) {
          commit("LOADING", false);
        }
      },
      error => {
        commit("snackbars/errors/LOG_ERROR", error.message, { root: true });
        // console.log("Firebase");
        // console.log(error);
      }
    );
  },



  setLoading({ commit }, data) {
    commit("LOADING", data);
  },

};

export const mutations = {
  SET_PROPERTIES: (state, data) => {
    state.properties.push(data);
    // console.log(`Set properties: ` + state.properties);
  },
  SET_LAST_VISIBLE: (state, data) => {
    /*     // console.log("Set_Last_Visible");
    // console.log(data); */
    state.lastVisible = data;
  },
  LOADING: (state, data) => {
    state.loading = data;
  },
  SET_PAGINATE_NEXT: state => {
    state.paginateNext = {
      disabled: true,
      dark: false
    };
  },
  REMOVE_USER_PROPERTY_STATE: state => {
    // console.log("LOG out From Remove User");
    state.properties = [];
    state.lastVisible = null;
    searchedProperties = [];
    lastSearchedVisible = null;
    paginateNextSearched = {
      disabled: false,
      dark: true
    };
    state.paginateNext = {
      disabled: false,
      dark: true
    };
    state.loading = true;
  },

};
