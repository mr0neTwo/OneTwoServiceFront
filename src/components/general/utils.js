const optionsShowDate = {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
   hour: 'numeric',
   minute: 'numeric',
   // second: 'numeric'
 }

export function showPhone (phone) {
   return `+${phone.slice(0, 1)}(${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 10)}-${phone.slice(9, 12)}`
}

export function check0_100 (value) {
   return !(value < 0 || value > 100) && !isNaN(value)
}

export function check0_999 (value) {
   return value > 0 && !isNaN(value)
}

export function showName (employee) {
   return `${employee.last_name} ${employee.first_name}`
}

export function showDate (date) {
   return new Date(date * 1000).toLocaleString('ru', optionsShowDate).replace('г.,', '')
}

export function currentMonth() {
   let today = new Date
   let start_date = new Date
   start_date.setDate(1)
   start_date.setHours(0, 0, 0, 0)
   return [parseInt(start_date / 1000), parseInt(today / 1000)]
}