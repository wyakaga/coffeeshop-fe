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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const deleteHandler = (item) => {
    deleteHistory(item.history_id, item.product_id, token, controller)
      .then(() => {
        fetchHistoryData();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        toast.success("Successfully deleted", { duration: Infinity });
      })
      .catch((error) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        console.log(error);
      });
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
            <div
              className={`content-wrapper lg:min-h-[755.56px] ${
                historyData.length
                  ? "grid xl:grid-cols-3 xl:grid-rows-5 md:grid-cols-2 lg:gap-8"
                  : "flex justify-center items-start"
              } px-12 gap-4`}
            >
              {historyData.length ? (
                historyData.map((item, index) => {
                  return (
                    <HistoryCard
                      key={index}
                      item={item}
                      index={index}
                      deleteHandler={deleteHandler}
                    />
                  );
                })
              ) : (
                <div className="bg-white flex md:flex-row flex-col justify-center items-center gap-x-3 w-3/4 lg:w-1/2 py-4 rounded-md shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
                  <span className="material-icons-round text-first-brown text-5xl">
                    warning
                  </span>
                  <p className="font-poppins text-3xl text-center text-first-brown">
                    You haven&apos;t bought anything
                  </p>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default History;
