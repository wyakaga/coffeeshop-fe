import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { deleteHistory } from "../../utils/https/transaction";
import { historyAction } from "../../redux/slices/history";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import HistoryCard from "../../components/HistoryCard";

function History() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.data?.token);
  const controller = useMemo(() => new AbortController(), []);

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistoryData = async () => {
    setIsLoading(true);
    try {
      const { payload } = await dispatch(
        historyAction.getHistoryThunk({ token, controller })
      );
      setHistoryData(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const deleteHandler = (item) => {
    deleteHistory(item.history_id, item.product_id, token, controller)
      .then(() => {
        fetchHistoryData();
        toast.success("Successfully deleted", { duration: Infinity });
      })
      .catch((error) => console.log(error));
  };

  document.title = "History";

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <Header title="history" />
      <main>
        {isLoading && <Loader />}
        <section className="history-bg bg-cover bg-no-repeat bg-center">
          <section className="main-title py-10">
            <div className="title-wrapper flex flex-col gap-3">
              <p className="font-rubik font-bold text-4xl text-center text-white">
                Let&apos;s see what you have bought!
              </p>
              <p className="font-rubik font-normal text-lg text-center text-white">
                Long press to delete item
              </p>
            </div>
          </section>
          <section className="main-content pt-10 pb-32">
            <div className="content-wrapper lg:min-h-[755.56px] grid xl:grid-cols-3 xl:grid-rows-5 md:grid-cols-2 lg:gap-8 px-12 gap-4">
              {historyData.map((item, index) => {
                return (
                  <HistoryCard
                    key={index}
                    item={item}
                    index={index}
                    deleteHandler={deleteHandler}
                  />
                );
              })}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default History;
