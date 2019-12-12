import React, { useState } from 'react'

export const Inp = ({ color, valium, cqS, indor, isUser, TA, us, small, isQ, data }) => {
    const [estQ, setestQ] = useState(valium)
    return (
        <>
            {TA ? <textarea spellCheck={false} style={{
                marginLeft: isUser ? "0px" : "20px",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "1.9vw",
                flexGrow: 1,
                backgroundColor: "transparent",
                border: "none",
                color
            }} value={estQ}
                onBlur={() => {
                    if (isUser) {
                        cqS(us, estQ, indor)
                    } else {
                        cqS(estQ, indor)
                    }

                }
                }
                onChange={(event) => {
                    setestQ(event.target.value)
                }} /> : <input style={{
                    marginLeft: isUser ? "0px" : "20px",
                    fontWeight: "400",
                    fontSize: "1.9vw",
                    width: small ? "30px" : "atuo",
                    flexGrow: 1,
                    backgroundColor: "transparent",
                    border: "none",
                    color
                }}
                    type="text"
                    value={estQ}
                    onBlur={() => {
                        if (estQ == "") {
                            window.alert("Input cannot be null")
                        } else {
                            if (isUser) {
                                cqS(us, estQ, indor)
                            } else if (isQ) {
                                let elonbina = [...us]
                                elonbina[indor].value = estQ
                                cqS(elonbina, data.id, "questions")
                            }
                            else {
                                cqS(estQ, indor)
                            }
                        }


                    }
                    }
                    onChange={(event) => {
                        setestQ(event.target.value)
                    }} />}

        </>
    )
}
