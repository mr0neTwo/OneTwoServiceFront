
import React from 'react'

const AddPicture = (props) => {
   return (
      <div className={props.className}>
            <div className='lableImput'>{props.title}</div>
            
            <div class={props.img ? 'showPicture' : 'addPicture'}>
               <label class="label">
                 {props.img ? <img src={ props.img } className='showPicture'/> :
                 <i class="material-icons">attach_file</i>
                  }
                  <input 
                     className=''
                     type='file'
                     name={props.name}
                     onChange={props.onChange}
                     value={props.value}
                     disabled={props.disabled}
                  />
               </label>

            </div>
      </div>
   )
}


  
 export default AddPicture