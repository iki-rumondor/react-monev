import React from "react";
import { sprintf } from "sprintf-js";

export function MessageList() {
    return (
        <div>
            <a href="#" class="dropdown-item dropdown-item-unread">
                <div class="dropdown-item-avatar">
                    <img
                        alt="image"
                        src={sprintf("src/assets/img/avatar/%s", img)}
                        class="rounded-circle"
                    />
                    <div class="is-online"></div>
                </div>
                <div class="dropdown-item-desc">
                    <b>{name}</b>
                    <p>{message}</p>
                    <div class="time">{time}</div>
                </div>
            </a>
        </div>
    );
}
