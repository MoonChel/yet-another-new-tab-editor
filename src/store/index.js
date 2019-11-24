import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid/v4";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    currentDocumentId: null,
    documents: []
  },
  mutations: {
    updateDocument(state, document) {
      let index = state.documents.findIndex(d => d.id === document.id);
      Vue.set(state.documents, index, Object.assign(state.documents[index], document));

      console.log("document updated", document);
    },
    setCurrentDocumentId(state, documentId) {
      state.currentDocumentId = documentId;

      console.log("selected new current document", documentId);
    },
    addNewDocument(state) {
      let newDocument = {
        id: uuidv4(),
        name: "New Document",
        content: ""
      };

      state.documents.push(newDocument);
      state.currentDocumentId = newDocument.id;

      console.log("new document added");
    },
    removeDocument(state, document) {
      let deleteDocument = confirm("Are you sure, you want to delete this document?");

      if (!deleteDocument) {
        return;
      }

      let index = state.documents.findIndex(d => d.id === document.id);
      state.documents.splice(index, 1);

      console.log("document removed", document);
    }
  },
  getters: {
    documents: state => state.documents,
    currentDocument: state => {
      console.log("current document", state.currentDocumentId);

      return state.documents.find(d => d.id === state.currentDocumentId);
    }
  }
});
