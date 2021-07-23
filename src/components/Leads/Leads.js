import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'



const Leads = (props) => {

 
  console.log(props.order)

  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут обращения</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
        <p></p>
        {/* {props.order ? props.order.map(order => (<p key = {order.id}>{JSON.stringify(order)}</p>)): null} */}
        
      </div>
    </div>
  )
}

const docData = {
  stringExample: "Hello world!",
  booleanExample: true,
  numberExample: 3.14159265,
  // dateExample: firestore.Timestamp.fromDate(new Date("December 10, 1815")),
  arrayExample: [5, true, "hello"],
  nullExample: null,
  objectExample: {
      a: 5,
      b: {
          nested: "foo"
      }
  }
};



export default compose(
  firestoreConnect(() => [{ collection: 'Orders'}]),
  connect((state, props) => ({
    order: state.firestore.ordered
  })))
(Leads)
