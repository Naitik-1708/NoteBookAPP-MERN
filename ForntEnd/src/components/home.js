import React  from 'react'
import Note from './note';



const Home = (props) => {
  let {showalert} = props;
    return (
        <>
        <Note showalert={showalert}/>
        </>
    )
}

export default Home;