import React, { useState, useEffect } from "react";
import "../App.css";
import { Elevation } from "@rmwc/elevation";
import { Leaderquestion } from "../components/Leaderquestion";
import { FaRegTrashAlt } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import { UserItem } from "../components/UserItem"

export const Management = () => {
  const [Selected, setSelected] = useState(false);
  const [Users, setUsers] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const handleQE = (item, value, section) => {
    console.log("HANDLIN QUE")
    console.log(item)
    console.log(value)
    console.log(section)
    if (value == "") {
      window.alert("Value cannot be null")
      return 0
    }
    if (section == "answers") {
      if (item[section] <= 0) {
        window.alert("Correct answers cannot be lower or equal to 0")
      } else if (item[section] > 0) {

        fetch("http://localhost/4answers/server/api/eq.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/aq.php", {
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

        fetch("http://localhost/4answers/server/api/eq.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/aq.php", {
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


        fetch("http://localhost/4answers/server/api/eq.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/aq.php", {
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

        fetch("http://localhost/4answers/server/api/eq.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/aq.php", {
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

      fetch("http://localhost/4answers/server/api/eq.php", {
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
          fetch("http://localhost/4answers/server/api/aq.php", {
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
      fetch("http://localhost/4answers/server/api/eq.php", {
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
          fetch("http://localhost/4answers/server/api/aq.php", {
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
    if (value == "") {
      window.alert("Value cannot be null")
      return 0
    }
    if (section == "answers") {
      if (item[section] <= 0) {
        window.alert("Correct answers cannot be lower or equal to 0")
      } else if (item[section] > 0) {

        fetch("http://localhost/4answers/server/api/eu.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/au.php", {
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

        fetch("http://localhost/4answers/server/api/eu.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/au.php", {
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


        fetch("http://localhost/4answers/server/api/eu.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/au.php", {
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

        fetch("http://localhost/4answers/server/api/eu.php", {
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
          .then(data => fetch("http://localhost/4answers/server/api/au.php", {
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
      fetch("http://localhost/4answers/server/api/eu.php", {
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
        .then(data => fetch("http://localhost/4answers/server/api/au.php", {
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

    fetch("http://localhost/4answers/server/api/du.php", {
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
        fetch("http://localhost/4answers/server/api/au.php", {
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
    fetch("http://localhost/4answers/server/api/dq.php", {
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
        fetch("http://localhost/4answers/server/api/aq.php", {
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
    fetch("http://localhost/4answers/server/api/aq.php", {
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
    fetch("http://localhost/4answers/server/api/au.php", {
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
            fetch("http://localhost/4answers/server/api/au.php", {
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
            fetch("http://localhost/4answers/server/api/aq.php", {
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
