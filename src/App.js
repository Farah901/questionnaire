import React, { useState, useRef } from "react";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Preferences</h1>
      <UserPreferencesForm />
    </div>
  );
}

function UserPreferencesForm() {
  const [notificationMethod, setNotificationMethod] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState(["Paris", "London", "New York"]);
  const [showCityInput, setShowCityInput] = useState(false);
  const [skills, setSkills] = useState(["React", "Node.js", "JavaScript"]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [newCity, setNewCity] = useState("");
  const [showCustomSkillInput, setShowCustomSkillInput] = useState(false);
  const [preferences, setPreferences] = useState(null);

  const checkboxRefs = useRef([]);

  const handleNotificationChange = (e) => setNotificationMethod(e.target.value);

  const handleCityAddition = () => {
    if (newCity && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setNewCity("");
    }
    setShowCityInput(false);
  };

  const handleSkillChange = () => {
    const selected = checkboxRefs.current
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    setSelectedSkills(selected);
  };

  const handleAddCustomSkill = () => {
    if (customSkill && !skills.includes(customSkill)) {
      setSkills([...skills, customSkill]);
      setCustomSkill("");
      setShowCustomSkillInput(false);
    }
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();

    if (!notificationMethod || !selectedCity || selectedSkills.length === 0) {
      alert("Please complete all fields before submitting.");
      return;
    }

    setPreferences({
      notificationMethod,
      selectedCity,
      selectedSkills,
    });
  };

  return (
    <form onSubmit={validateAndSubmit} style={styles.section}>
      <h3 style={styles.subHeader}>Notification Preferences</h3>
      <label style={styles.label}>
        <input
          type="radio"
          value="Email"
          checked={notificationMethod === "Email"}
          onChange={handleNotificationChange}
          style={styles.radio}
        />
        Email
      </label>
      <label style={styles.label}>
        <input
          type="radio"
          value="SMS"
          checked={notificationMethod === "SMS"}
          onChange={handleNotificationChange}
          style={styles.radio}
        />
        SMS
      </label>

      <h3 style={styles.subHeader}>City Selection</h3>
      {!showCityInput && (
        <button
          type="button"
          onClick={() => setShowCityInput(true)}
          style={styles.button}
        >
          Add City
        </button>
      )}
      {showCityInput && (
        <div style={styles.hiddenInput}>
          <input
            type="text"
            placeholder="Add a city"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={handleCityAddition} style={styles.button}>
            Save City
          </button>
        </div>
      )}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        style={styles.select}
      >
        <option value="" disabled>
          Select a city
        </option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      <h3 style={styles.subHeader}>Skills Selection</h3>
      {skills.map((skill, index) => (
        <label key={index} style={styles.label}>
          <input
            type="checkbox"
            value={skill}
            ref={(el) => (checkboxRefs.current[index] = el)}
            onChange={handleSkillChange}
          />
          {skill}
        </label>
      ))}
      <label style={styles.label}>
        <input
          type="checkbox"
          value="Other"
          onChange={() => setShowCustomSkillInput(!showCustomSkillInput)}
        />
        Other
      </label>
      {showCustomSkillInput && (
        <div style={styles.hiddenInput}>
          <input
            type="text"
            placeholder="Add your skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={handleAddCustomSkill} style={styles.button}>
            Add Skill
          </button>
        </div>
      )}

      <button type="submit" style={styles.submitButton}>
        Submit
      </button>

      {preferences && (
        <div style={styles.floatingDiv}>
          <h1>Your Preferences</h1>
          <ul>
          <li>
            <strong>Notification Method:</strong> {preferences.notificationMethod}
          </li>
          <li>
            <strong>City:</strong> {preferences.selectedCity}
          </li>
          <li>
            <strong>Skills:</strong> {preferences.selectedSkills.join(", ")}
          </li>
          </ul>
          <button onClick={() => setPreferences(null)} style={styles.closeButton}>
            Close
          </button>
        </div>
      )}
    </form>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
  },
  header: {
    textAlign: "center",
    color: "#444",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
  },
  subHeader: {
    fontSize: "20px",
    color: "#555",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    margin: "8px 0",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  hiddenInput: {
    marginTop: "10px",
  },
  button: {
    margin: "10px 0",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitButton: {
    marginTop: "20px",
    padding: "15px 20px",
    backgroundColor: "#28A745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  radio: {
    marginRight: "8px",
  },
  floatingDiv: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "80%",
    maxWidth: "400px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;