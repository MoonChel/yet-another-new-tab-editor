<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic" />
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <font-awesome-icon icon="code" />
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <font-awesome-icon icon="strikethrough" />
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <font-awesome-icon icon="underline" />
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <font-awesome-icon icon="list-ul" />
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <font-awesome-icon icon="list-ol" />
        </button>

        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <font-awesome-icon icon="quote-right" />
        </button>
        <button
          class="button outline icon-only"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code_block"
        >
          <font-awesome-icon icon="code" />
        </button>
      </div>
    </editor-menu-bar>
    <p></p>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Bold,
  Italic,
  Link,
  HardBreak,
  Heading,
  Code,
  Strike,
  Underline,
  Blockquote,
  BulletList,
  OrderedList,
  ListItem,
  History,
  CodeBlockHighlight
} from "tiptap-extensions";

import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import sql from "highlight.js/lib/languages/sql";
import python from "highlight.js/lib/languages/python";
import go from "highlight.js/lib/languages/go";
import html from "highlight.js/lib/languages/htmlbars";
import php from "highlight.js/lib/languages/php";
import cpp from "highlight.js/lib/languages/cpp";
import nginx from "highlight.js/lib/languages/nginx";

export default {
  props: ["document"],

  components: {
    EditorContent,
    EditorMenuBar
  },

  mounted() {
    console.log("my editor: mounted with document", this.document);

    if (this.document) {
      this.editor.setContent(this.document.content);
    }
  },

  data() {
    return {
      editor: new Editor({
        content: "",
        extensions: [
          new Bold(),
          new Italic(),
          new Link(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Code(),
          new Strike(),
          new Underline(),
          new Blockquote(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new History(),
          new CodeBlockHighlight({
            languages: {
              javascript,
              css,
              sql,
              python,
              go,
              html,
              php,
              cpp,
              nginx
            }
          })
        ],
        onUpdate: this.onUpdate
      })
    };
  },

  methods: {
    onUpdate(state) {
      this.$emit("onUpdate", state);
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },

  watch: {
    document(newValue, oldValue) {
      if (this.document) {
        this.editor.setContent(this.document.content);
      }
    }
  }
};
</script>
