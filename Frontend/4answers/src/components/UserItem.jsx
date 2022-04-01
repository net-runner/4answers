import React from 'react'
import { Elevation } from "@rmwc/elevation";
import { FaRegTrashAlt } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import { Inp } from "./Inp"
export const UserItem = ({ item, index, hD, hE }) => {
    return (
        <Elevation key={index} z={1} wrap>
            <div
                key={index}
                className="item row"
                style={{
                    marginTop: 20,
                    alignItems: "space-between",
                    justifyContent: "space-between",
                    color: "#757575",
                    fontWeight: "400"
                }}
            >
                <div
                    className="normalText"
                    style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {index + 1}.
                </div>
                <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 3 }}
                >
                    <Inp color={"#757575"} valium={item.username} isUser us={item} cqS={hE} indor={"username"} />
                </div>


                <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1 }}
                >
                    <Inp color={"#757575"} valium={item.correctA} isUser us={item} cqS={hE} indor={"correctA"} />
                </div>
                <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1 }}
                >
                    <Inp color={"#757575"} valium={item.answers} isUser us={item} cqS={hE} indor={"answers"} />
                </div>
                <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 3 }}
                    onClick={() => hE(item, item.userType, "userType")}
                >
                    {item.userType}
                </div>
                <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1, marginLeft: "20px" }}
                >
                    {parseFloat(item.userp).toFixed(2)}%
                </div>
                <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1, marginLeft: "20px" }}
                >
                    {item.registerAt}
                </div>
                <IconButton onClick={() => hD(item.username)}>
                    <FaRegTrashAlt color={"#673ab7"} size={28} />
                </IconButton>
            </div>
        </Elevation>
    )
}
