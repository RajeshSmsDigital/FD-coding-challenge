import "./Statistics.scss";
import React, { useEffect, useState } from "react";
import { productsWrapper } from "../../api/DataService";


const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState([]);
  let content = <div>no stats</div>

  const loadStatistics = async () => {
    try {
      const res = await productsWrapper.getStatistics();
      if (res) {
        setStatisticsData(res.data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);


  if (statisticsData) {
    content = statisticsData.map(e => {
      return (
        <div className="stat-content" key={e.id}>
          <div className="stat-label">{e.label}:</div>
          <div className="stat-value"> {e.value[0].brand} </div>
        </div>
      )
    })
  }


  return (
    <div className="statistics">
      {content}
    </div>
  );
};

export default Statistics;
