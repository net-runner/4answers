import React, { useState, useEffect } from "react";
import "../App.css";
import { Leaderquestion } from "../components/Leaderquestion";
import { UserItem } from "../components/UserItem"
import SERVER_URL from "../constants";

export const Management = () => {
  const [Selected, setSelected] = useState(false);
  const [Users, setUsers] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const handleQE = (item, value, section) => {
    console.log("HANDLIN QUE")
    console.log(item)
    console.log(value)
    console.log(section)
    if (value === "") {
      window.alert("Value cannot be null")
      return 0
    }
    if (section === "answers") {
      console.log("ANSWERSPLZ")
      if (item[section] <= 0) {
        window.alert("Correct answers cannot be lower or equal to 0")
      } else if (item[section] > 0) {

        fetch(SERVER_URL + "eq.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.id,
            section,
            value
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "aq.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setQuestions(data.data);
            })).catch(err => console.log(err))


      } else {
        window.alert("String is not accepted here")
      }
    } else if (section === "correctA") {
      if (item[section] < 0) {
        window.alert("Correct answers cannot be lower than 0")
      } else if (item[section] >= 0) {

        fetch(SERVER_URL + "eq.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.id,
            section,
            value
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "aq.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setQuestions(data.data);
            })).catch(err => console.log(err))

      } else {
        window.alert("String is not accepted here")
      }
    } else if (section === "userType") {
      if (item.userType === "admin") {


        fetch(SERVER_URL + "eq.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.id,
            section,
            value: "normal"
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "aq.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setQuestions(data.data);
            })).catch(err => console.log(err))


      } else {

        fetch(SERVER_URL + "eq.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.id,
            section,
            value: "admin"
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "aq.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setQuestions(data.data);
            })).catch(err => console.log(err))

      }
    } else if (section === "questions") {

      fetch(SERVER_URL + "eq.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: value,
          section,
          value: item
        })
      }).then(result => result.json())
        .then(data => {
          console.log(data)
          fetch(SERVER_URL + "aq.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setQuestions(data.data);
            })
        }).catch(err => console.log(err))

    }
    else {
      fetch(SERVER_URL + "eq.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: item.id,
          section,
          value
        })
      }).then(result => result.json())
        .then(data => {
          console.log(data)
          fetch(SERVER_URL + "aq.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setQuestions(data.data);
            })
        }).catch(err => console.log(err))

    }
  }
  const handleUE = (item, value, section) => {
    if (value === "") {
      window.alert("Value cannot be null")
      return 0
    }
    if (section === "answers") {
      if (item[section] <= 0) {
        window.alert("Correct answers cannot be lower or equal to 0")
      } else if (item[section] > 0) {

        fetch(SERVER_URL + "eu.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.username,
            section,
            value
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "au.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setUsers(data.data);
            })).catch(err => console.log(err))


      } else {
        window.alert("String is not accepted here")
      }
    } else if (section === "correctA") {
      if (item[section] < 0) {
        window.alert("Correct answers cannot be lower than 0")
      } else if (item[section] >= 0) {

        fetch(SERVER_URL + "eu.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.username,
            section,
            value
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "au.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setUsers(data.data);
            })).catch(err => console.log(err))

      } else {
        window.alert("String is not accepted here")
      }
    } else if (section === "userType") {
      if (item.userType === "admin") {


        fetch(SERVER_URL + "eu.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.username,
            section,
            value: "normal"
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "au.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setUsers(data.data);
            })).catch(err => console.log(err))


      } else {

        fetch(SERVER_URL + "eu.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: item.username,
            section,
            value: "admin"
          })
        }).then(result => result.json())
          .then(data => fetch(SERVER_URL + "au.php", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => {
              if (data.data) setUsers(data.data);
            })).catch(err => console.log(err))

      }
    }
    else {
      fetch(SERVER_URL + "eu.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: item.username,
          section,
          value
        })
      }).then(result => result.json())
        .then(data => fetch(SERVER_URL + "au.php", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(result => result.json())
          .catch(err => console.log(err))
          .then(data => {
            if (data.data) setUsers(data.data);
          })).catch(err => console.log(err))
    }

  }
  const handleUD = us => {

    fetch(SERVER_URL + "du.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: us
      })
    })
      .then(result => {
        fetch(SERVER_URL + "au.php", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(result => result.json())
          .catch(err => console.log(err))
          .then(data => {
            if (data.data) setUsers(data.data);
          });
      })
      .catch(err => console.log(err));
  };
  const handleQD = qen => {
    console.log(qen)
    fetch(SERVER_URL + "dq.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: qen
      })
    }).then(result => result.json())
      .then(result => {
        console.log(result)
        fetch(SERVER_URL + "aq.php", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(result => result.json())
          .catch(err => console.log(err))
          .then(data => {
            console.log(data)
            if (data.data) setQuestions(data.data);
          });
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetch(SERVER_URL + "aq.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        if (data)
          if (data.data) setQuestions(data.data);
      });
    fetch(SERVER_URL + "au.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        if (data)
          if (data.data) setUsers(data.data);
      });
  }, []);
  return (
    <div className="column">
      <div className="row flexcenter" style={{ marginBottom: "20px" }}>
        <div
          style={{
            width: "20vw",
            marginRight: 20,
            padding: 5,
            borderRadius: 10,
            backgroundColor: !Selected ? "#673ab7" : "#757575"
          }}
          onClick={() => {
            setSelected(!Selected)
            fetch(SERVER_URL + "au.php", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            })
              .then(result => result.json())
              .catch(err => console.log(err))
              .then(data => {
                if (data)
                  if (data.data) setUsers(data.data);
              });
          }}
        >
          USERS
        </div>
        <div
          style={{
            width: "20vw",
            marginRight: 20,
            padding: 5,
            borderRadius: 10,
            backgroundColor: !Selected ? "#757575" : "#673ab7"
          }}
          onClick={() => {
            setSelected(!Selected)
            fetch(SERVER_URL + "aq.php", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            })
              .then(result => result.json())
              .catch(err => console.log(err))
              .then(data => {
                if (data)
                  if (data.data) setQuestions(data.data);
              });
          }}
        >
          QUESTIONS
        </div>
      </div>
      {!Selected
        ? Users.map((item, index) => {
          return (
            <UserItem key={index} item={item} index={index} hD={handleUD} hE={handleUE} />
          );
        })
        : Questions.map((item, index) => {
          return (
            <Leaderquestion
              hE={handleQE}
              hQD={handleQD}
              isManagement
              item={item}
              index={index}
              key={index}
            />
          );
        })}
    </div>
  );
};
