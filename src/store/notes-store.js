import Vue from "vue";
import { orderBy } from "lodash";
import alert from "@/services/alert";
import notesApi from "@/services/api/notes-api";

export default {
  state: {
    notes: []
  },
  getters: {
    notes: state => orderBy(state.notes, ["date"], ["desc"]),
    notesByUser: state => userId =>
      orderBy(
        state.notes.filter(note => note.userId === userId),
        ["date"],
        ["desc"]
      )
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, note) {
      state.notes.push(note);
      alert.notification(`Note ${note.title} created!`);
    },
    setNote(state, { id, note }) {
      const index = state.notes.findIndex(note => note.id === id);
      Vue.set(state.notes, index, note);
      alert.notification(`Note ${note.title} updated!`);
    },
    removeNote(state, id) {
      const note = state.notes.find(note => note.id === id);
      state.notes.splice(state.notes.indexOf(note), 1);
      alert.notification(`Note ${note.title} deleted!`, "is-danger");
    }
  },
  actions: {
    readNotes({ commit }) {
      return notesApi.read().then(notes => commit("setNotes", notes));
    },
    createNote({ commit }, note) {
      return notesApi.create(note).then(note => commit("addNote", note));
    },
    updateNote({ commit }, { id, note }) {
      return notesApi
        .update(id, note)
        .then(note => commit("setNote", { id, note }));
    },
    deleteNote({ commit }, id) {
      return notesApi.delete(id).then(() => commit("removeNote", id));
    }
  }
};
