<template>
  <div id="app" class="container">
    <div class="row" style="padding-top: 10pt;">
      <div class="col-3 right-border">
        <h4>
          <span style="padding-right: 10px">Documents</span>
          <button type="button" class="button primary icon-only" @click.prevent="addNewDocument">
            <font-awesome-icon icon="plus" />
          </button>
        </h4>

        <p v-for="document in documents" :key="document.id">
          <document-link :document="document"></document-link>
        </p>
      </div>

      <div class="col-8">
        <template v-if="documents.length === 0">
          <h1 class="text-light is-marginless my-link" @click.prevent="addNewDocument">
            Click to add a new document
          </h1>
        </template>
        <template v-else>
          <my-editor :document="currentDocument" @onUpdate="onDocumentUpdate"></my-editor>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import MyEditor from "./components/MyEditor";
import DocumentLink from "./components/DocumentLink";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "app",

  components: {
    MyEditor,
    DocumentLink
  },

  computed: {
    ...mapGetters(["currentDocument", "documents"])
  },

  methods: {
    ...mapMutations(["addNewDocument", "updateDocument"]),
    onDocumentUpdate(state) {
      this.updateDocument({
        id: this.currentDocument.id,
        content: state.getHTML()
      });
    }
  }
};
</script>
