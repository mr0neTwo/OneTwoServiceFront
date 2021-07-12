import React, { useState } from "react";

import StatusList from "./StatusList";

const optionsShowDate = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  // second: 'numeric'
};

function getDateEstimated(datestamp, idStatusGroop) {
  const deltaDay = Math.round(
    (new Date(datestamp) - Date.now()) / (24 * 60 * 60 * 1000)
  );
  const deltaHour = Math.round(
    (new Date(datestamp) - Date.now()) / (24 * 60 * 60 * 1000)
  );
  return idStatusGroop < 4
    ? deltaDay > 0
      ? `${deltaDay}д.`
      : `${deltaHour}ч.`
    : "-";
}

function TableOrders(props) {
  let statusVis = {};
  props.ordersShow.forEach((order) => {
    statusVis[order.id] = false;
  });

  const [statusMenuVisible, setStatusMenuVisible] = useState(statusVis);

  function getEmploeeName(id) {
    if (id) {
      let employee = props.employees.find((employee) => employee.id === id);
      return `${employee.last_name} ${employee.first_name}`;
    }
  }

  function openStatusMenu(id) {
    let clone = Object.assign({}, statusMenuVisible);
    clone[id] = !clone[id];
    setStatusMenuVisible(clone);
  }
  return (
    <div className="tableOrders">
      <table>
        <thead className="tableThead">
          <tr>
            <th
              style={{ minWidth: "90px" }}
              onClick={props.onSort.bind(null, "id")}
            >
              Заказ №{" "}
              <span>
                {props.sortField === "id"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "150px" }}
              onClick={props.onSort.bind(null, "created_by_id")}
            >
              Создан{" "}
              <span>
                {props.sortField === "created_by_id"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "150px" }}
              onClick={props.onSort.bind(null, "estimated_done_at")}
            >
              Срок заказа{" "}
              <span>
                {props.sortField === "estimated_done_at"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "150px" }}
              onClick={props.onSort.bind(null, "status.name")}
            >
              Статус{" "}
              <span>
                {props.sortField === "status.name"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "150px" }}
              onClick={props.onSort.bind(null, "custom_fields.f718506")}
            >
              Тип устройства{" "}
              <span>
                {props.sortField === "custom_fields.f718506"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "130px" }}
              onClick={props.onSort.bind(null, "custom_fields.f718512")}
            >
              Бренд{" "}
              <span>
                {props.sortField === "custom_fields.f718512"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "130px" }}
              onClick={props.onSort.bind(null, "malfunction")}
            >
              Неисправность{" "}
              <span>
                {props.sortField === "malfunction"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "150px" }}
              onClick={props.onSort.bind(null, "engineer_id")}
            >
              Исполнитель{" "}
              <span>
                {props.sortField === "engineer_id"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "180px" }}
              onClick={props.onSort.bind(null, "client.name")}
            >
              Клиент{" "}
              <span>
                {props.sortField === "client.name"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "130px" }}
              onClick={props.onSort.bind(null, "price")}
            >
              Цена
              <span>
                {props.sortField === "price"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
            <th
              style={{ minWidth: "130px" }}
              onClick={props.onSort.bind(null, "engineer_notes")}
            >
              Заметки исполнителя{" "}
              <span>
                {props.sortField === "engineer_notes"
                  ? props.sort === "asc"
                    ? "↓"
                    : "↑"
                  : null}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.ordersShow.map((order) => (
            <tr key={order.id}>
              {/* Поле: Номер заказа */}
              <td className="orderLabel tableRow">
                <span>{order.id_label}</span>
              </td>
              {/* Поле: Заказ создан */}
              <td>
                {/* Возвращаем имя инженера создавшего заказ через его ID */}
                <div>{getEmploeeName(order.created_by_id)}</div>
                {/* Выводим и форматируем дату создания */}
                <div className="orderDate">
                  {new Date(order.created_at).toLocaleString(
                    "ru",
                    optionsShowDate
                  )}
                </div>
              </td>
              {/* Поле: Срок заказа */}
              <td>
                {/* Вывожу иконку времени с цветовой зависимостью от статуса и времени просрочки */}
                <div className="estimated-top">
                  <svg
                    className="clockEstimated"
                    viewBox="0 0 32 32"
                    style={{
                      fill:
                        new Date(order.estimated_done_at) < Date.now() &&
                        order.status.group < 4
                          ? "#f0ad4e"
                          : "#ebebeb",
                    }}
                  >
                    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414-2.829 2.829z"></path>
                  </svg>
                  {/* Вывожу разницу времени от создания до плановой даты готовности в днях или часах */}
                  <span>
                    {getDateEstimated(
                      order.estimated_done_at,
                      order.status.group
                    )}
                  </span>
                </div>
                {/* Вывожу форматированую дату готовности */}
                <div className="orderDate">
                  {new Date(order.estimated_done_at).toLocaleString(
                    "ru",
                    optionsShowDate
                  )}
                </div>
              </td>
              {/* Поле: Статус */}
              <td className="orderStatus">
                tableText tableOne{" "}
                <span>
                  <button
                    className="statusButtom"
                    type="button"
                    style={{ backgroundColor: order.status.color }}
                    onClick={() => openStatusMenu(order.id)}
                  >
                    {order.status.name}
                    <span className="statusSeparate"> | &#6662;</span>
                  </button>
                  {statusMenuVisible[[order.id]] ? (
                    <StatusList
                      status={props.status}
                      orderId={order.id}
                      changeOderStatus={props.changeOderStatus}
                      openStatusMenu={openStatusMenu}
                    />
                  ) : null}
                </span>
              </td>
              {/* Поле тип устройства */}
              <td>
                <span className="tableText">{order.custom_fields.f718506}</span>
              </td>
              {/* Бренд */}
              <td>
                <span className="tableText">{order.custom_fields.f718512}</span>
              </td>
              {/* Неисправность */}
              <td>
                <div className="tableText tableOne">{order.malfunction}</div>
              </td>
              {/* Исполнитель */}
              <td>
                {/* {order.engineer_id} */}
                <div>{getEmploeeName(order.engineer_id)}</div>
              </td>
              {/* Клиент */}
              <td>
                <div className="tableClientName">{order.client.name}</div>
                <div className="orderDate">{order.client.phone}</div>
              </td>
              {/* Цена */}
              <td className="tablePrice">
                <span>{order.price ? order.price : null}</span>
              </td>
              {/* Заметки исполнителя */}
              <td>
                <div className="tableText tableOne">{order.engineer_notes}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default TableOrders;
