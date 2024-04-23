import React, {Component} from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";


class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      }
    ],
    searchText: ""
  };
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
    };

    onType = (editMeId, updatedKey, updatedValue) => {
   // editMeId == id of the note that is edited
   // updatedKey == title or description field
   // updatedValue == value of title or description

      const updatedNotes = this.state.notes.map((note) => {
        if (note.id !== editMeId) {
          return note;
        } else {
          if (updatedKey === "title") {
            note.title = updatedValue;
            return note;
          } else {
            note.description = updatedValue;
            return note;
          }
        }
      });
      this.setState({notes: updatedNotes});
    };

    onSearch = (text) => {
      const newSearchText = text.toLowerCase();
      const updateNotes = this.state.notes.map( note => {
        if (!newSearchText) {
          note.doesMatchSearch = true;
          return note;
        } else {
          const title = note.title.toLowerCase();
          const description = note.description.toLowerCase();
          const titleMatch = title.includes(newSearchText);
          const descriptionMatch = description.includes(newSearchText);
          const hasMatch = titleMatch || descriptionMatch; 
          note.doesMatchSearch = hasMatch;
          return note;
          }
      });
      this.setState({
        searchText: newSearchText,
        notes:updateNotes
      });
    };

    removeNote = (noteId) => {
      const updatedNotes = this.state.notes.filter (note => note.id !== noteId)
      this.setState({ notes: updatedNotes });
   
    };

    componentDidUpdate() {
     const stringifedNotes = JSON.stringify(this.state.notes);
     localStorage.setItem("savedNotes", stringifedNotes); 

    }

    componentDidMount(){
      const stringifedNotes = localStorage.getItem("savedNotes");
      if (stringifedNotes) {
        const savedNotes = JSON.parse(stringifedNotes);
        this.setState({notes: savedNotes});
      }

    }


  render() {
    return (
      <div>
    <Header
    searchText={this.state.searchText} 
     onSearch={this.onSearch}
     addNote={this.addNote}
     />
    <NotesList removeNote ={this.removeNote} onType={this.onType} notes={this.state.notes} />
  </div>
    );
  
  }

}

export default App;
