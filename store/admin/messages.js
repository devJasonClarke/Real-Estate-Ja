export const state = () => ({
  newMessages: [],
  oldMessages: [],
  lastVisible: null,
  loading: true,
  paginateNext: {
    disabled: false,
    dark: true
  }
});

export const getters = {
  newMessages: state => state.newMessages,
  oldMessages: state => {
    state.oldMessages;
    let amount = 0;
    for (let i = 0; i < state.newMessages.length; i++) {
      if (state.newMessages[i][0].read == false) {
        // console.log("The Amount");
        // console.log(amount);
        amount++;
      }
    }
    return amount;
  },
  loading: state => state.loading,
  lastVisible: state => state.lastVisible,
  paginateNext: state => state.paginateNext
};

export const actions = {
  getNewMessages({ commit, state, rootState }) {
    // console.log("getNewMessages");
    let role = localStorage.getItem("role");
    this.$fireModule.auth().onAuthStateChanged(user => {
      // console.log(role);
      if (user && role === "admin") {
        // console.log("Get User: User");
        // console.log(user);
        // console.log(`Properties: ${state.newMessages.length}`);

        // console.log("lastVisible");
        // console.log(state.lastVisible);

        const ref = this.$fire.firestore
          .collection("adminMessages")
          .orderBy("timestamp.sent", "desc")
          .startAfter(state.lastVisible || {})
          .limit(8);

        ref.get().then(
          querySnapshot => {
            commit(
              "SET_LAST_VISIBLE",
              Object.freeze(querySnapshot.docs[querySnapshot.docs.length - 1])
            );
            //    // console.log("lastVisible_2");
            //     // console.log(state.lastVisible);

            if (querySnapshot.empty) {
              //    // console.log("Empty");

              commit("SET_PAGINATE_NEXT");
            }
            if (querySnapshot.empty && state.newMessages.length) {
              commit(
                "snackbars/errors/LOG_ERROR",
                "You have no more messages.",
                {
                  root: true
                }
              );
            }

            querySnapshot.forEach(doc => {
              //   // console.log(`This Document was fetched ${doc.id}`);
              commit("SET_Messages", [doc.data(), doc.id]);
            });

            commit("LOADING", false);

            if (state.newMessages === []) {
              commit("LOADING", false);
            }
          },
          error => {
            commit("snackbars/errors/LOG_ERROR", error.message, { root: true });
            // console.log("Firebase");
            // console.log(error);
          }
        );
      } else {
        commit("LOADING", false);
      }
    });
  },
  readMessage({ commit }, info) {
    // console.log("read message");
    // console.log(messageId);

    this.$fire.firestore
      .collection("adminMessages")
      .doc(info.messageId)
      .update({
        read: true,
        "timestamp.read": this.$fireModule.firestore.FieldValue.serverTimestamp()
      });

      commit("CHANGE_MESSAGE_READ_STATE", info.index);
  },

  deleteMessage({ commit }, messageId) {
    // console.log("read message");
    // console.log(messageId);

    this.$fire.firestore
      .collection("adminMessages")
      .doc(messageId)
      .delete()
      .then(() => {
        commit("snackbars/success/LOG_SUCCESS", "Message successfully deleted!", { root: true });
        // console.log("Document successfully deleted!");
      })
      .catch(error => {
        commit("snackbars/errors/LOG_ERROR", error.message, { root: true });
      });

    // commit("READ_MESSAGE");
  },
  removeLocalMessage({ commit }, index) {
    // console.log("REMOVE local message ");
    // console.log(index);

    commit("REMOVE_LOCAL_MESSAGE", index);
  },
  setLoading({ commit }, data) {
    commit("LOADING", data);
  },

  setPaginateNext({ commit }, data) {
    commit("SET_PAGINATE_NEXT", data);
  },
  removeUserPropertyState({ commit }) {
    commit("REMOVE_USER_PROPERTY_STATE");
  }
};

export const mutations = {
  SET_Messages: (state, data) => {
    state.newMessages.push(data);
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
  REMOVE_Messages: state => {
    // console.log("LOG out From Remove User");
    state.newMessages = [];
    state.lastVisible = null;
    state.loading = true;
    state.paginateNext = {
      disabled: false,
      dark: true
    };
  },
  CHANGE_MESSAGE_READ_STATE: (state, index) => {
    let message = [...state.newMessages];

    message[index][0].read = true;

    state.newMessages = message;
  },
  REMOVE_LOCAL_MESSAGE: (state, index) => {
    let message = [...state.newMessages];

    message.splice(index, 1);

    state.newMessages = message;
  },

  DELETE_MESSAGE: (state, index) => {
    state.messages.splice(index, 1);
  }
};
