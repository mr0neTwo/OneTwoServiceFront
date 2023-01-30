import React from 'react'


const Leads = () => {


    const handleOnCkick = () => {

        fetchOrders()
    }

    async function fetchOrders() {

        const url = 'https://onetwoonline.moizvonki.ru/api/v1'

        const body = {
            user_name: 'stasmen66@gmail.com',
            api_key: '1zww7we8zoq53rm32cmewjnjx683asms',
            action: 'calls.send_sms',
            to: '79002888475',
            text: 'Брат привет!'
        }

        try {
            const request_config = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Content-Length': '2'
                },
                body: JSON.stringify(body)
            }

            await fetch(url, request_config)
                .then(response => response.json())
                .then(data => console.log(data))


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="temp-page">
            <div className="temp-page__body">
                <h3>Здесь будут обращения</h3>
                <h5>Страница на стадии разработки</h5>
                {/*<button onClick={handleOnCkick} className="dataDownload">*/}
                {/*    Загрузить заказ*/}
                {/*</button>*/}
            </div>
        </div>
    )
}

export default Leads
