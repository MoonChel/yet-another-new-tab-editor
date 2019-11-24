<template>
  <div id="app" class="container">
    <div class="row" style="padding-top: 20pt;">
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
        <my-editor :document="currentDocument" @onUpdate="onDocumentUpdate"></my-editor>
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
