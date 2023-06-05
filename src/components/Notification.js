import React from "react";

import { toast, ToastBar, Toaster } from "react-hot-toast";

export const Notification = () => {
	return (
		<Toaster
			position="top-right"
			reverseOrder={false}
			toastOptions={{
				style: {
					border: "none",
					padding: "1rem",
					color: "#713200",
					fontSize: "17px",
					marginTop: "2rem",
				}
			}}
		>
			{(t) => (
				<ToastBar className={`flex items-center`} toast={t}>
					{({ icon, message }) => (
						<>
							{icon}
							{message}
							{t.type !== "loading" && <button className="flex justify-center items-center" onClick={() => toast.dismiss(t.id)}><i className="material-icons">close</i></button>}
						</>
					)}
				</ToastBar>
			)}
		</Toaster>
	);
};
