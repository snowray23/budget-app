import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import jwtDecode from 'jwt-decode'

ChartJS.register(Title, Tooltip, Legend, ArcElement); 


const DonutChart = () => {
    const [spendings, setSpendings] = useState(0);


    useEffect(() => {
        let sumSpendings = 0
        axios.get('http://localhost:5000/transactions')
        .then(res => {
          res.data.forEach(item => {
            if(item.type === 'expense') {
              sumSpendings += Number(item.amount)
              setSpendings(sumSpendings)
            } 
          })
        })
      }, [])
      



    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setDecodedToken(decodedToken);
        onDashboardData(token);
    
        const budget = decodedToken?.budget || 0;
        const percentage = (budget - spendings) / budget * 100;
        console.log("PERCENTAGE REMAINING BAL", percentage)
        setPercentageVal(percentage)
    }, []);




    const data = {
      // labels: ['Remaining'],
      datasets: [
        {
          label: 'Budgets',
          data: [10, 10],
          backgroundColor: [
            '#16272F',
            '#56F0B8',
          ],
          borderColor: [
            '#16272F',
            
            '#56F0B8'
          ],
          borderWidth: 2,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          positionX: 'center',
          positionY: 'center',
        },
        tooltip: {
          enabled: true,
        },
      },
      cutout: '90%', 
    };
  
    return <Doughnut data={data} options={options} />;
  };

  
  export default DonutChart;