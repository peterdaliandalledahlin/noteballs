import { defineStore } from 'pinia'
import { doc, addDoc, collection, onSnapshot, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from './storeAuth'

//const notesCollectionRef = collection(db, 'notes')
let notesCollectionRef
let notesCollectionQuery

let getNotesSnapshot = null


export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        // {
        //   id: 'id1',
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quae animi quod assumenda laboriosam quis quo ipsam magnam eius odit.'
        // },
        // {
        //     id: 'id2',
        //     content: 'Content for note 2'
        // },
        // {
        //     id: 'id3',
        //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        // },
        // {
        //     id: 'id4',
        //     content: 'Short note...'
        // },
      ],
      notesLoaded: true
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth() 
      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
          let notes = []
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date
            }
            notes.push(note)
          })
            this.notes = notes
            this.notesLoaded = true
      }, error => {
        console.log(error.message)
      })
    },
    clearNotes() {
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot() //unsubscribe from any active listener 
    },
    async addNote(newNoteContent) {

      let currentDate = new Date().getTime(),
      date = currentDate.toString()

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      })

    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(id, content) {
      //let index = this.notes.findIndex( note => note.id === id )
      //this.notes[index].content = content

      await updateDoc(doc(notesCollectionRef, id), {
        content
      })
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})