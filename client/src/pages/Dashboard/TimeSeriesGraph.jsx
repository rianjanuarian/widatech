import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getInvoice, invoiceSelectors } from "../../redux/invoiceSlice";
import LineChart from "./LineChart";

Chart.register(CategoryScale);

export default function App() {
  const dispatch = useDispatch();
  const invoices = useSelector(invoiceSelectors.selectAll);
  const status = useSelector((state) => state.invoices.status);

  useEffect(() => {
    dispatch(getInvoice());
  }, [dispatch]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained ",
        data: [],
        backgroundColor: [],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    if (status === "success") {
      setChartData({
        labels: invoices.map((data) => data.createdAt.slice(0, 10)),
        datasets: [
          {
            label: "Users Gained ",
            data: invoices.map((data) => data.productsold),
            backgroundColor: [],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });
    }
  }, [invoices, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return <div>Error: Unable to fetch invoice data.</div>;
  }

  return (
    <div className="App">
      <LineChart chartData={chartData}></LineChart>
    </div>
  );
}
