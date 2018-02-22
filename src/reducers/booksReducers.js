'use strict'
export function booksReducers(state=[], action){
    switch(action.type){
        case "GET_EVENTS":
            let books = action.payload.map((record)=>{return Object.assign({},record)});
            return books;
        case "POST_EVENTS":
            books = state.concat(action.payload);
            return books;
            // return {books: [...state.books,...action.payload]}
        case "DELETE_EVENT":
            let id = action.payload;
            console.log('------------------',id);
            books = state.filter((record)=>{
                return ( record._id !== id );
            });
            return books;
        case "UPLOAD_EVENTS":
            id = action.payload._id;
            books = state.map((record)=>{return Object.assign({},record)});
            books = books.map((record) =>{
                if(record._id === id){
                    // record.title = action.payload.title,
                    record.date = action.payload.date,
                    record.description = action.payload.description,
                    record.venue = action.payload.venue,
                    record.time = action.payload.time,
                    record.no_of_people_involved = action.payload.no_of_people_involved;
                }
                return record;
            });
            return books;
        default:
            console.log('Error matching perfect action in bookReducers');
		    break;
	}
	return state;
}