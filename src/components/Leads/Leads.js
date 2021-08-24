import React from 'react'


const Leads = () => {
  


  const handleOnCkick = () => {
 
    fetchOrders()
  }

  async function fetchOrders() {
    try {
      const request_config = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Accept': '*/*'
        },
        body: JSON.stringify({"page": 0})
      }
      const response = await fetch("http://192.168.1.48:5005/get_orders", request_config)
      const data = await response.json()
      console.log(`fetchOrder - success: ${data['success']}`,)
      console.log(data)
    } catch(error){
        console.log(error)
    }
  }



  return (
    <div className="tempPage">
      <div className="tempContainer">
        <h1 className="tempTitle">Здесь будут обращения</h1>
        <p className="tempDescription">Страница на стадии разработки</p>
        <button onClick={handleOnCkick} className="dataDownload">
          Загрузить заказ
        </button>
      </div>
    </div>
  )
}

export default Leads
