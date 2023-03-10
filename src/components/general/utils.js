const optionsShowDateTime = {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
   hour: 'numeric',
   minute: 'numeric',
   // second: 'numeric'
}

const optionsShowDate = {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
   // hour: 'numeric',
   // minute: 'numeric',
   // second: 'numeric'
}

const optionsShowRangeDate = {
   year: 'numeric',
   month: 'numeric',
   day: 'numeric'
}

/**
 * Приводит номер телефона к читабильному виду
 *
 * @param {number} phone The phone number in the format 71234567890
 * @return {string} The phone number in the string '+7 (123) 456-78-90'
 */
export function showPhone (phone) {
   return `+${phone.slice(0, 1)}(${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`
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

export function showDate (date, showTime=true) {
   const options = showTime ? optionsShowDateTime : optionsShowDate
   return new Date(date * 1000).toLocaleString('ru', options).replace(' г. в', '')
}

export function showRangeDate (range_date) {
   const first = new Date(range_date[0] * 1000).toLocaleString('ru', optionsShowRangeDate).replace(' г. в', '')
   const second = new Date(range_date[1] * 1000).toLocaleString('ru', optionsShowRangeDate).replace(' г. в', '')
   return `${first} - ${second}`
}

export function currentMonth() {
   let today = new Date
   let start_date = new Date
   start_date.setDate(1)
   start_date.setHours(0, 0, 0, 0)
   return [parseInt(start_date / 1000), parseInt(today / 1000)]
}

export function includesObject(obj, list) {
   for (let i = 0; i < list.length; i++) {
      if (list[i].id === obj.id) {
         return true
      }
   }
   return false
}

export function checkObject (object) {
   if (!object) return false
   return Boolean(Object.values(object).length);
}

export function valueOfPhoneInput(number) {
   if (number) {
      switch (number.length) {
         case 0: 
            return ''
         case 1:
            return `+${number[0]}`
         case 2:
            return `+${number[0]} (${number[1]}`
         case 3:
            return `+${number[0]} (${number[1]}${number[2]}`
         case 4:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}`
         case 5:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}) ${number[4]}`
         case 6:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}) ${number[4]}${number[5]}`
         case 7:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}) ${number[4]}${number[5]}${number[6]}`
         case 8:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}) ${number[4]}${number[5]}${number[6]}-${number[7]}`
         case 9:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}) ${number[4]}${number[5]}${number[6]}-${number[7]}${number[8]}`
         case 10:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}) ${number[4]}${number[5]}${number[6]}-${number[7]}${number[8]}-${number[9]}`
         case 11:
            return `+${number[0]} (${number[1]}${number[2]}${number[3]}) ${number[4]}${number[5]}${number[6]}-${number[7]}${number[8]}-${number[9]}${number[10]}`
      } 
   } else {
      return ''
   }
}

export const compareDates = (date1, date2) => {
   date1 = new Date(date1 * 1000)
   date2 = new Date(date2 * 1000)
   return date1.getDate() === date2.getDate() &&
       date1.getMonth() === date2.getMonth() &&
       date1.getFullYear() === date2.getFullYear()
}


