import React from "react";
import SHOES_QUERY from "../services/api/queries/shoes/getShoes";
import Query from "../services/api/query";


const Table = () => {
  return (
    <div>
      <Query query={SHOES_QUERY} id={null}>
        {({ data: { shoes } }) => {
          return (
            <table className={"m-table"}>
              <thead>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Size</th>
                  <th>Purchased</th>
                  <th>Date</th>
                  <th>Sold</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Price Sold</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {shoes.map((shoe, index) => (
                  <tr key={index}>
                    <td>{shoe.key}</td>
                    <td>{shoe.code}</td>
                    <td>{shoe.size.name}</td>
                    <td>{shoe.locationPurchase.name}</td>
                    {/*TODO: If Int64 convert to datetime*/}
                    <td>{shoe.datePurchase}</td>
                    <td>{shoe.locationSold.name}</td>
                    {/*TODO: If Int64 convert to datetime*/}
                    <td>{shoe.dateSold}</td>
                    <td>{shoe.pricePurchase}</td>
                    <td>{shoe.priceSold}</td>
                    <td><button className={'m-table__a-button m-table__a-button--edit'}><img className={'m-table__a-icon'} src={"/edit.png"} alt={"Edit"}/></button></td>
                    <td><button className={'m-table__a-button m-table__a-button--delete'}><img className={'m-table__a-icon'} src={"/delete.png"} alt={"Delete"}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }}
      </Query>
    </div>
  );
};

export default Table;