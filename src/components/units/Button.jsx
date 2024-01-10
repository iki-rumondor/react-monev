import classNames from "classnames";
import React from "react";
import { sprintf } from "sprintf-js";

export function DefaultButton({
	type = "button",
	color = "primary",
	className,
	children,
	onClick,
}) {
	return (
		<div>
			<button
				onClick={onClick}
				type={type}
				className={classNames(
					"btn",
					sprintf("btn-%s", color),
					className
				)}
			>
				{children}
			</button>
		</div>
	);
}

export function ModalButton({ color = "primary", className, children, idModal }) {
	return (
		<div>
			<button
				data-toggle="modal"
				data-target={sprintf("#%s", idModal)}
				type="button"
				className={classNames(
					"btn",
					sprintf("btn-%s", color),
					className
				)}
			>
				{children}
			</button>
		</div>
	);
}
