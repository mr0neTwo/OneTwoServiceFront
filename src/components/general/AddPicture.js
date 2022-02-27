import React from 'react'

const AddPicture = (props) => {

    const fileHandler = event => {
        let reader = new FileReader()
        reader.onload = function (e) {
            props.onChange(e.target.result)
        }
        reader.readAsDataURL(event.target.files[0])
    }
   return (

      <div className={props.className}>
            <div className='lableImput'>{props.title}</div>
            
            <div className={props.value || props.url ? 'showPicture' : 'addPicture'}>
               <label className="label">
                 {props.value || props.url ? <img src={props.value || `${process.env.PUBLIC_URL}/${props.url}`} className='showPicture'/> :
                 <i className="material-icons">attach_file</i>
                  }
                  <input 
                     className=''
                     type='file'
                     accept="image/*"
                     onChange={fileHandler}
                     disabled={props.disabled}
                  />
               </label>

            </div>
      </div>
   )
}


  
 export default AddPicture