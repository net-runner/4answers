import React, { useState, useEffect } from "react";
import "./App.css";
import { LoginPopup } from "./components/LoginPopup";
import { Header } from "./components/Header";
import { TabPanel } from "./components/TabPanel";
import { TestPanel } from "./screens/TestPanel";
import { Leaderboard } from "./screens/Leaderboard";
import { History } from "./screens/History";

function App() {
  const [user, setUser] = useState();
  const [screen, cScreen] = useState(0);
  useEffect(() => {
    let xd = localStorage.getItem("user");
    xd !== "undefined" && setUser(JSON.parse(xd));
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setUser();
  };

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div className="nomargin column">
            <Header
              screen={screen}
              cScreen={cScreen}
              handleLogout={handleLogout}
              user={user}
            />
            {user.type === "normal" && (
              <>
                <TabPanel value={screen} index={0} style={{ flex: 9 }}>
                  <TestPanel user={user} sU={setUser} />
                </TabPanel>
                <TabPanel value={screen} index={1} style={{ flex: 9 }}>
                  <Leaderboard />
                </TabPanel>
                <TabPanel value={screen} index={2} style={{ flex: 9 }}>
                  <History user={user} />
                </TabPanel>
              </>
            )}
          </div>
        ) : (
          <LoginPopup user={user} setUser={setUser} />
        )}
      </header>
    </div>
  );
}

export default App;
