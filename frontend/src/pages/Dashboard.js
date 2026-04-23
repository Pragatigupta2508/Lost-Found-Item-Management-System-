import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState({
    itemName: "",
    description: "",
    type: "",
    location: "",
    date: "",
    contactInfo: ""
  });
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
    }
  }, [token]);

  
  const fetchItems = async () => {
    try {
      const res = await axios.get("https://lost-found-item-management-system-4jn3.onrender.com/api/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ➕ Add item
  const addItem = async () => {
    try {
      if (
        !data.itemName ||
        !data.description ||
        !data.type ||
        !data.location ||
        !data.date ||
        !data.contactInfo
      ) {
        alert("Fill all fields");
        return;
      }

      await axios.post("https://lost-found-item-management-system-4jn3.onrender.com/api/items", data, {
        headers: { Authorization: token }
      });

      alert("Item Added ");

      setData({
        itemName: "",
        description: "",
        type: "",
        location: "",
        date: "",
        contactInfo: ""
      });

      fetchItems();
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Error");
    }
  };

  
  const deleteItem = async (id) => {
    await axios.delete(`https://lost-found-item-management-system-4jn3.onrender.com/api/items/${id}`, {
      headers: { Authorization: token }
    });
    fetchItems();
  };

 
  const updateItem = async (id) => {
    await axios.put(
      `https://lost-found-item-management-system-4jn3.onrender.com/api/items/${id}`,
      { location: "Updated Location" },
      { headers: { Authorization: token } }
    );
    fetchItems();
  };

 
  const searchItems = async () => {
    const res = await axios.get(
      `https://lost-found-item-management-system-4jn3.onrender.com/api/items/search?name=${search}`
    );
    setItems(res.data);
  };


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

 
  const styles = {
 container: {
  padding: "20px",
  minHeight: "100vh",
  fontFamily: "Poppins, sans-serif",
  background: `
    radial-gradient(circle at 20% 20%, #ffdde1 0%, transparent 40%),
    radial-gradient(circle at 80% 30%, #c2e9fb 0%, transparent 40%),
    radial-gradient(circle at 50% 80%, #fbc2eb 0%, transparent 40%),
    linear-gradient(135deg, #fdfbfb, #ebedee)
  `
},
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "28px",
    fontWeight: "bold"
  },
  card: {
    background: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginBottom: "10px"
  },
  itemCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.3s"
  },
  addBtn: {
    background: "linear-gradient(45deg, #00c6ff, #0072ff)",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  searchBtn: {
    background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    marginRight: "5px",
    cursor: "pointer"
  },
  resetBtn: {
    background: "linear-gradient(45deg, #a18cd1, #fbc2eb)",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "#ff4b5c",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer"
  },
  updateBtn: {
    background: "#ffa502",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  logoutBtn: {
    display: "block",
    margin: "25px auto",
    padding: "12px 25px",
    background: "linear-gradient(45deg, #232526, #414345)",
    color: "white",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lost & Found Dashboard</h1>

      {/* ADD ITEM */}
      <div style={styles.card}>
        <h2>Add Item</h2>

        <div style={styles.grid}>
          <input placeholder="Item Name" value={data.itemName} onChange={e => setData({...data, itemName: e.target.value})} />
          <input placeholder="Description" value={data.description} onChange={e => setData({...data, description: e.target.value})} />
          <input placeholder="Type (Lost/Found)" value={data.type} onChange={e => setData({...data, type: e.target.value})} />
          <input placeholder="Location" value={data.location} onChange={e => setData({...data, location: e.target.value})} />
          <input type="date" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
          <input placeholder="Contact Info" value={data.contactInfo} onChange={e => setData({...data, contactInfo: e.target.value})} />
        </div>

        <button style={styles.addBtn} onClick={addItem}>Add Item</button>
      </div>

      {/* SEARCH */}
      <div style={styles.card}>
        <h2>Search</h2>
        <input value={search} onChange={e => setSearch(e.target.value)} />
        <button style={styles.searchBtn} onClick={searchItems}>Search</button>
        <button style={styles.resetBtn} onClick={fetchItems}>Reset</button>
      </div>

      {/* ITEMS */}
      <div style={styles.card}>
        <h2>Items</h2>

        {items.map(item => (
          <div key={item._id} style={styles.itemCard}>
            <h3>{item.itemName}</h3>
            <p>{item.description}</p>
            <p><b>{item.type}</b></p>
            <p>{item.location}</p>
            <p>{item.date}</p>
            <p>{item.contactInfo}</p>

            <div>
              <button style={styles.deleteBtn} onClick={() => deleteItem(item._id)}>Delete</button>
              <button style={styles.updateBtn} onClick={() => updateItem(item._id)}>Update</button>
            </div>
          </div>
        ))}
      </div>

      <button style={styles.logoutBtn} onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;