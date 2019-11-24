<template>
  <div class="row" @mouseenter="mouseover = true" @mouseleave="mouseover = false">
    <div class="col-9 is-marginless">
      <span
        class="button clear"
        :contenteditable="true"
        @click.prevent="setCurrentDocumentId(document.id)"
        @blur="updateDocumentName"
        @input="checkNameLength"
      >
        {{ document.name }}
      </span>
    </div>
    <div class="col-4 is-marginless">
      <button
        v-if="mouseover || isCurrent"
        @click.prevent="removeDocument(document)"
        class="button icon-only"
      >
        <font-awesome-icon icon="trash-alt" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["document"],

  data() {
    return {
      mouseover: false
    };
  },

  computed: {
    ...mapGetters(["currentDocument"]),
    isCurrent() {
      if (!this.currentDocument) {
        return false;
      }

      return this.currentDocument.id === this.document.id;
    }
  },

  methods: {
    ...mapMutations(["removeDocument", "setCurrentDocumentId", "updateDocument"]),
    checkNameLength() {
      if (event.target.innerText.length > 20) {
        alert("Document name is too long...");
        event.target.innerText = this.document.name;
        return;
      }
    },
    updateDocumentName(event) {
      this.updateDocument({
        id: this.document.id,
        name: event.target.innerText
      });
    }
  }
};
</script>
