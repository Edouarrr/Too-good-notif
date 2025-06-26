import React, { useState, useEffect } from 'react';
import { Bell, Plus, Settings, Trash2, Edit3, Check, X, Clock, Mail, MapPin, Euro, Smartphone, MessageCircle, Search, Star, TrendingUp, Heart } from 'lucide-react';

const TooGoodToGoMonitor = () => {
  // Liste des magasins populaires à Paris pour l'autocomplétion
  const popularStores = [
    // La Maison du Chocolat - Toutes les boutiques Paris
    { name: "La Maison du Chocolat - Faubourg Saint-Honoré", address: "225 rue du Faubourg Saint-Honoré, 75008 Paris", category: "Chocolaterie" },
    { name: "La Maison du Chocolat - Victor Hugo", address: "120 avenue Victor Hugo, 75016 Paris", category: "Chocolaterie" },
    { name: "La Maison du Chocolat - Madeleine", address: "Boulevard de la Madeleine, 75009 Paris", category: "Chocolaterie" },
    { name: "La Maison du Chocolat - François 1er", address: "52 rue François 1er, 75008 Paris", category: "Chocolaterie" },
    { name: "La Maison du Chocolat - Carrousel du Louvre", address: "99 rue de Rivoli, 75001 Paris", category: "Chocolaterie" },
    { name: "La Maison du Chocolat - Galeries Lafayette", address: "35 boulevard Haussmann, 75009 Paris", category: "Chocolaterie" },
    { name: "La Maison du Chocolat - Champs-Élysées", address: "133 avenue des Champs-Élysées, 75008 Paris", category: "Chocolaterie" },
    { name: "La Maison du Chocolat - Saint-Germain", address: "19 rue de Sèvres, 75006 Paris", category: "Chocolaterie" },
    
    // Autres magasins populaires
    { name: "Kayser - Assas", address: "87 rue d'Assas, 75006 Paris", category: "Boulangerie", favorite: true },
    { name: "Maison Louis", address: "Rue Saint-Jacques, 75005 Paris", category: "Pâtisserie", favorite: true },
    { name: "Boulangerie Julien", address: "75 Rue Saint-Antoine, 75004 Paris", category: "Boulangerie" },
    { name: "Breizh Café", address: "109 Rue Vieille du Temple, 75003 Paris", category: "Crêperie" },
    { name: "Du Pain et des Idées", address: "34 Rue Yves Toudic, 75010 Paris", category: "Boulangerie" },
    { name: "Pierre Hermé", address: "72 Rue Bonaparte, 75006 Paris", category: "Pâtisserie" },
    { name: "L'As du Fallafel", address: "34 Rue des Rosiers, 75004 Paris", category: "Restaurant" },
    { name: "Berthillon", address: "31 Rue Saint-Louis en l'Île, 75004 Paris", category: "Glacier" },
    { name: "Poilâne", address: "8 Rue du Cherche-Midi, 75006 Paris", category: "Boulangerie" },
    { name: "Café de Flore", address: "172 Boulevard Saint-Germain, 75006 Paris", category: "Café" },
    { name: "Ladurée Champs-Élysées", address: "75 Avenue des Champs-Élysées, 75008 Paris", category: "Pâtisserie" },
    { name: "Le Comptoir du Relais", address: "9 Carrefour de l'Odéon, 75006 Paris", category: "Restaurant" },
    { name: "Bistrot Paul Bert", address: "18 Rue Paul Bert, 75011 Paris", category: "Restaurant" },
    { name: "Eric Kayser - Monge", address: "8 rue Monge, 75005 Paris", category: "Boulangerie" },
    { name: "Des Gâteaux et du Pain", address: "63 Boulevard Pasteur, 75015 Paris", category: "Boulangerie" },
    { name: "Chambelland", address: "14 Rue Ternaux, 75011 Paris", category: "Boulangerie" },
    { name: "Ten Belles", address: "10 Rue de la Grange aux Belles, 75010 Paris", category: "Café" }
  ];

  const [stores, setStores] = useState([
    {
      id: 1,
      name: "La Maison du Chocolat - Faubourg Saint-Honoré",
      address: "225 rue du Faubourg Saint-Honoré, 75008 Paris",
      available: true,
      price: "4.99",
      quantity: 3,
      pickupTime: "18:00 - 19:30",
      lastCheck: "12:00",
      rating: 4.8,
      category: "Chocolaterie",
      favorite: false
    },
    {
      id: 2,
      name: "Kayser - Assas",
      address: "87 rue d'Assas, 75006 Paris",
      available: false,
      price: "3.99",
      quantity: 0,
      pickupTime: "17:00 - 18:30",
      lastCheck: "12:00",
      rating: 4.6,
      category: "Boulangerie",
      favorite: true
    },
    {
      id: 3,
      name: "Maison Louis",
      address: "Rue Saint-Jacques, 75005 Paris",
      available: true,
      price: "5.99",
      quantity: 2,
      pickupTime: "19:00 - 20:00",
      lastCheck: "12:00",
      rating: 4.7,
      category: "Pâtisserie",
      favorite: true
    }
  ]);

  const [checkTimes, setCheckTimes] = useState(["09:00", "12:00", "15:00", "18:00"]);
  const [notificationConfig, setNotificationConfig] = useState({
    email: "",
    emailEnabled: false,
    phone: "",
    smsEnabled: false,
    whatsappEnabled: false
  });
  const [showAddStore, setShowAddStore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingTime, setEditingTime] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [addTimeMode, setAddTimeMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterCategory, setFilterCategory] = useState("Tous");

  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    category: "Restaurant"
  });

  const categories = ["Tous", "Chocolaterie", "Boulangerie", "Pâtisserie", "Restaurant", "Café", "Crêperie", "Glacier"];

  // Styles CSS inline
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
      color: 'white',
      padding: '2rem'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    headerIcon: {
      background: 'rgba(255,255,255,0.2)',
      padding: '0.75rem',
      borderRadius: '0.75rem',
      backdropFilter: 'blur(10px)'
    },
    headerButtons: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    btn: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem'
    },
    btnPrimary: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      backdropFilter: 'blur(10px)'
    },
    btnSuccess: {
      background: '#10b981',
      color: 'white'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem'
    },
    card: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #f1f5f9',
      overflow: 'hidden'
    },
    cardHeader: {
      background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '1.5rem'
    },
    cardContent: {
      padding: '1.5rem'
    },
    storeCard: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '2px solid #e2e8f0',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginBottom: '1rem',
      transition: 'all 0.3s ease'
    },
    favoriteCard: {
      background: 'linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%)',
      border: '2px solid #fca5a5'
    },
    storeHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    storeInfo: {
      flex: 1
    },
    storeName: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      flexWrap: 'wrap'
    },
    storeTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    badgeAvailable: {
      background: '#d1fae5',
      color: '#065f46'
    },
    badgeUnavailable: {
      background: '#fee2e2',
      color: '#991b1b'
    },
    badgeCategory: {
      background: '#f3f4f6',
      color: '#6b7280'
    },
    storeAddress: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#6b7280',
      marginBottom: '1rem'
    },
    storeDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    detailBox: {
      padding: '0.75rem',
      borderRadius: '0.5rem',
      textAlign: 'center'
    },
    detailBoxBlue: {
      background: '#eff6ff',
      color: '#1e40af'
    },
    detailBoxPurple: {
      background: '#f5f3ff',
      color: '#7c2d12'
    },
    detailBoxOrange: {
      background: '#fff7ed',
      color: '#ea580c'
    },
    detailBoxGreen: {
      background: '#f0fdf4',
      color: '#166534'
    },
    storeActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginLeft: '1rem'
    },
    actionBtn: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      background: 'transparent',
      transition: 'all 0.3s ease'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      background: 'white'
    },
    settingsPanel: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      padding: '2rem',
      marginBottom: '2rem'
    },
    notificationBox: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
      border: '1px solid #bfdbfe',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginBottom: '1rem'
    },
    suggestions: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      zIndex: 10,
      maxHeight: '15rem',
      overflowY: 'auto'
    },
    suggestionItem: {
      padding: '0.75rem',
      borderBottom: '1px solid #f3f4f6',
      cursor: 'pointer',
      transition: 'background 0.2s'
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  // Filtrage des magasins pour l'autocomplétion
  useEffect(() => {
    if (searchTerm.length > 0) {
      let filtered = popularStores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (filterCategory !== "Tous") {
        filtered = filtered.filter(store => store.category === filterCategory);
      }
      
      setFilteredStores(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredStores([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, filterCategory]);

  const selectStore = (store) => {
    setNewStore({
      name: store.name,
      address: store.address,
      category: store.category
    });
    setSearchTerm(store.name);
    setShowSuggestions(false);
  };

  const addStore = () => {
    if (newStore.name && newStore.address) {
      const store = {
        id: Date.now(),
        name: newStore.name,
        address: newStore.address,
        category: newStore.category,
        available: Math.random() > 0.5,
        price: (Math.random() * 10 + 2).toFixed(2),
        quantity: Math.floor(Math.random() * 5) + 1,
        pickupTime: "17:30 - 19:00",
        lastCheck: "12:00",
        rating: (Math.random() * 2 + 3).toFixed(1),
        favorite: false
      };
      setStores([...stores, store]);
      setNewStore({ name: "", address: "", category: "Restaurant" });
      setSearchTerm("");
      setShowAddStore(false);
    }
  };

  const removeStore = (id) => {
    setStores(stores.filter(store => store.id !== id));
  };

  const toggleFavorite = (id) => {
    setStores(stores.map(store => 
      store.id === id ? { ...store, favorite: !store.favorite } : store
    ));
  };

  const simulateCheck = () => {
    const currentTime = new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const updatedStores = stores.map(store => ({
      ...store,
      available: Math.random() > 0.3,
      quantity: Math.floor(Math.random() * 5) + 1,
      price: (Math.random() * 10 + 2).toFixed(2),
      lastCheck: currentTime
    }));
    
    setStores(updatedStores);
    
    // Simulation de notifications
    const availableStores = updatedStores.filter(store => store.available);
    if (availableStores.length > 0 && (notificationConfig.emailEnabled || notificationConfig.smsEnabled || notificationConfig.whatsappEnabled)) {
      const methods = [];
      if (notificationConfig.emailEnabled) methods.push("📧 Email");
      if (notificationConfig.smsEnabled) methods.push("📱 SMS");
      if (notificationConfig.whatsappEnabled) methods.push("💬 WhatsApp");
      
      const newNotification = {
        id: Date.now(),
        time: currentTime,
        stores: availableStores.map(s => s.name),
        message: `${availableStores.length} magasin(s) disponible(s)`,
        methods: methods.join(", ")
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }
  };

  const getNotificationCount = () => {
    let count = 0;
    if (notificationConfig.emailEnabled) count++;
    if (notificationConfig.smsEnabled) count++;
    if (notificationConfig.whatsappEnabled) count++;
    return count;
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      "Chocolaterie": "🍫",
      "Boulangerie": "🥖",
      "Pâtisserie": "🧁",
      "Restaurant": "🍽️",
      "Café": "☕",
      "Crêperie": "🥞",
      "Glacier": "🍦"
    };
    return emojis[category] || "🏪";
  };

  const favoriteStores = stores.filter(store => store.favorite);
  const regularStores = stores.filter(store => !store.favorite);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              <Bell size={32} />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                Surveillance Too Good To Go
              </h1>
              <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9 }}>
                Ne ratez plus jamais une bonne affaire ! 🍫✨
              </p>
            </div>
          </div>
          <div style={styles.headerButtons}>
            <button
              style={{...styles.btn, ...styles.btnPrimary}}
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={18} />
              Paramètres
            </button>
            <button
              style={{...styles.btn, ...styles.btnSuccess}}
              onClick={simulateCheck}
            >
              <TrendingUp size={18} />
              Vérifier maintenant
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Settings Panel */}
        {showSettings && (
          <div style={styles.settingsPanel}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
              ⚙️ Paramètres
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
                🔔 Méthodes de notification
              </h3>
              
              <div style={styles.notificationBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Mail size={20} style={{ color: '#2563eb' }} />
                  <span style={{ fontWeight: '500' }}>Email</span>
                  <button
                    onClick={() => setNotificationConfig({...notificationConfig, emailEnabled: !notificationConfig.emailEnabled})}
                    style={{
                      marginLeft: 'auto',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      background: notificationConfig.emailEnabled ? '#10b981' : '#d1d5db',
                      color: notificationConfig.emailEnabled ? 'white' : '#6b7280'
                    }}
                  >
                    {notificationConfig.emailEnabled ? '✅ Activé' : '❌ Désactivé'}
                  </button>
                </div>
                <input
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={notificationConfig.email}
                  onChange={(e) => setNotificationConfig({...notificationConfig, email: e.target.value})}
                  style={styles.input}
                />
              </div>

              <div style={{...styles.notificationBox, background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Smartphone size={20} style={{ color: '#059669' }} />
                  <span style={{ fontWeight: '500' }}>SMS</span>
                  <button
                    onClick={() => setNotificationConfig({...notificationConfig, smsEnabled: !notificationConfig.smsEnabled})}
                    style={{
                      marginLeft: 'auto',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      background: notificationConfig.smsEnabled ? '#10b981' : '#d1d5db',
                      color: notificationConfig.smsEnabled ? 'white' : '#6b7280'
                    }}
                  >
                    {notificationConfig.smsEnabled ? '✅ Activé' : '❌ Désactivé'}
                  </button>
                </div>
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={notificationConfig.phone}
                  onChange={(e) => setNotificationConfig({...notificationConfig, phone: e.target.value})}
                  style={styles.input}
                />
              </div>

              <div style={{...styles.notificationBox, background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', border: '1px solid #5eead4'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MessageCircle size={20} style={{ color: '#0d9488' }} />
                  <span style={{ fontWeight: '500' }}>WhatsApp</span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>(même numéro que SMS)</span>
                  <button
                    onClick={() => setNotificationConfig({...notificationConfig, whatsappEnabled: !notificationConfig.whatsappEnabled})}
                    style={{
                      marginLeft: 'auto',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      background: notificationConfig.whatsappEnabled ? '#10b981' : '#d1d5db',
                      color: notificationConfig.whatsappEnabled ? 'white' : '#6b7280'
                    }}
                  >
                    {notificationConfig.whatsappEnabled ? '✅ Activé' : '❌ Désactivé'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={styles.content}>
          {/* Stores List */}
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                      🏪 Magasins surveillés
                    </h2>
                    <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9 }}>
                      {stores.length} magasin(s) actif(s) • {favoriteStores.length} favoris ⭐
                    </p>
                  </div>
                  <button
                    style={{...styles.btn, ...styles.btnPrimary}}
                    onClick={() => setShowAddStore(!showAddStore)}
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>
              </div>

              {showAddStore && (
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)' }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    ✨ Ajouter un nouveau magasin
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      style={styles.select}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{getCategoryEmoji(cat)} {cat}</option>
                      ))}
                    </select>
                    
                    <div style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Search size={16} style={{ color: '#6b7280' }} />
                        <label style={{ fontWeight: '500', color: '#374151' }}>Rechercher un magasin</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Tapez le nom d'un magasin parisien..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setNewStore({...newStore, name: e.target.value});
                        }}
                        style={styles.input}
                      />
                      
                      {showSuggestions && filteredStores.length > 0 && (
                        <div style={styles.suggestions}>
                          {filteredStores.map((store, index) => (
                            <div
                              key={index}
                              onClick={() => selectStore(store)}
                              style={{
                                ...styles.suggestionItem,
                                ':hover': { background: '#f3f4f6' }
                              }}
                              onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                              onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.125rem' }}>{getCategoryEmoji(store.category)}</span>
                                <div>
                                  <div style={{ fontWeight: '500', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {store.name}
                                    {store.favorite && <Heart size={14} style={{ color: '#ef4444' }} />}
                                  </div>
                                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{store.address}</div>
                                  <span style={{ fontSize: '0.75rem', background: '#f3f4f6', color: '#6b7280', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>
                                    {store.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Adresse du magasin"
                      value={newStore.address}
                      onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                      style={styles.input}
                    />
                    
                    <select
                      value={newStore.category}
                      onChange={(e) => setNewStore({...newStore, category: e.target.value})}
                      style={styles.select}
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{getCategoryEmoji(cat)} {cat}</option>
                      ))}
                    </select>
                    
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={addStore}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        ✅ Ajouter
                      </button>
                      <button
                        onClick={() => {
                          setShowAddStore(false);
                          setSearchTerm("");
                          setNewStore({name: "", address: "", category: "Restaurant"});
                        }}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: '#e5e7eb',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        ❌ Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.cardContent}>
                {/* Favoris */}
                {favoriteStores.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={styles.sectionTitle}>
                      <Heart style={{ color: '#ef4444' }} size={20} />
                      ⭐ Mes Favoris
                    </h3>
                    {favoriteStores.map((store) => (
                      <div key={store.id} style={{...styles.storeCard, ...styles.favoriteCard}}>
                        <div style={styles.storeHeader}>
                          <div style={styles.storeInfo}>
                            <div style={styles.storeName}>
                              <span style={{ fontSize: '1.5rem' }}>{getCategoryEmoji(store.category)}</span>
                              <h3 style={styles.storeTitle}>{store.name}</h3>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Star size={16} style={{ color: '#fbbf24' }} />
                                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>{store.rating}</span>
                              </div>
                              <span style={{...styles.badge, ...styles.badgeCategory}}>{store.category}</span>
                              <span style={{
                                ...styles.badge,
                                ...(store.available ? styles.badgeAvailable : styles.badgeUnavailable)
                              }}>
                                {store.available ? '✅ Disponible' : '❌ Rupture'}
                              </span>
                            </div>
                            <div style={styles.storeAddress}>
                              <MapPin size={16} style={{ color: '#3b82f6' }} />
                              {store.address}
                            </div>
                            <div style={styles.storeDetails}>
                              <div style={{...styles.detailBox, ...styles.detailBoxBlue}}>
                                <div style={{ fontWeight: '500' }}>💰 Prix:</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                  <Euro size={16} />
                                  <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{store.price}</span>
                                </div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxPurple}}>
                                <div style={{ fontWeight: '500' }}>📦 Quantité:</div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginTop: '0.25rem' }}>{store.quantity}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxOrange}}>
                                <div style={{ fontWeight: '500' }}>🕐 Retrait:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem' }}>{store.pickupTime}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxGreen}}>
                                <div style={{ fontWeight: '500' }}>🔄 Dernière vérif:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem' }}>{store.lastCheck}</div>
                              </div>
                            </div>
                          </div>
                          <div style={styles.storeActions}>
                            <button
                              onClick={() => toggleFavorite(store.id)}
                              style={{...styles.actionBtn, color: '#ef4444'}}
                            >
                              <Heart size={20} style={{ fill: '#ef4444' }} />
                            </button>
                            <button
                              onClick={() => removeStore(store.id)}
                              style={{...styles.actionBtn, color: '#ef4444'}}
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Autres magasins */}
                {regularStores.length > 0 && (
                  <div>
                    <h3 style={styles.sectionTitle}>
                      🏪 Autres magasins
                    </h3>
                    {regularStores.map((store) => (
                      <div key={store.id} style={styles.storeCard}>
                        <div style={styles.storeHeader}>
                          <div style={styles.storeInfo}>
                            <div style={styles.storeName}>
                              <span style={{ fontSize: '1.5rem' }}>{getCategoryEmoji(store.category)}</span>
                              <h3 style={styles.storeTitle}>{store.name}</h3>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Star size={16} style={{ color: '#fbbf24' }} />
                                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>{store.rating}</span>
                              </div>
                              <span style={{...styles.badge, ...styles.badgeCategory}}>{store.category}</span>
                              <span style={{
                                ...styles.badge,
                                ...(store.available ? styles.badgeAvailable : styles.badgeUnavailable)
                              }}>
                                {store.available ? '✅ Disponible' : '❌ Rupture'}
                              </span>
                            </div>
                            <div style={styles.storeAddress}>
                              <MapPin size={16} style={{ color: '#3b82f6' }} />
                              {store.address}
                            </div>
                            <div style={styles.storeDetails}>
                              <div style={{...styles.detailBox, ...styles.detailBoxBlue}}>
                                <div style={{ fontWeight: '500' }}>💰 Prix:</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                  <Euro size={16} />
                                  <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{store.price}</span>
                                </div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxPurple}}>
                                <div style={{ fontWeight: '500' }}>📦 Quantité:</div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginTop: '0.25rem' }}>{store.quantity}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxOrange}}>
                                <div style={{ fontWeight: '500' }}>🕐 Retrait:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem' }}>{store.pickupTime}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxGreen}}>
                                <div style={{ fontWeight: '500' }}>🔄 Dernière vérif:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem' }}>{store.lastCheck}</div>
                              </div>
                            </div>
                          </div>
                          <div style={styles.storeActions}>
                            <button
                              onClick={() => toggleFavorite(store.id)}
                              style={{...styles.actionBtn, color: '#9ca3af'}}
                            >
                              <Heart size={20} />
                            </button>
                            <button
                              onClick={() => removeStore(store.id)}
                              style={{...styles.actionBtn, color: '#ef4444'}}
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Notifications Panel */}
            <div style={styles.card}>
              <div style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: 'white', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bell size={20} />
                  🔔 Notifications récentes
                </h2>
              </div>
              <div style={styles.cardContent}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <Bell size={48} style={{ color: '#d1d5db', marginBottom: '0.75rem' }} />
                    <p style={{ color: '#6b7280', margin: '0 0 0.25rem 0' }}>Aucune notification pour le moment</p>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Activez les notifications dans les paramètres</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {notifications.map((notif) => (
                      <div key={notif.id} style={{
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                        border: '1px solid #a7f3d0',
                        borderRadius: '0.75rem',
                        padding: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065f46', fontWeight: '600' }}>
                          <Bell size={16} />
                          <span>{notif.time}</span>
                        </div>
                        <p style={{ color: '#047857', fontWeight: '500', margin: '0.25rem 0' }}>{notif.message}</p>
                        <p style={{ color: '#059669', fontSize: '0.875rem', margin: '0.25rem 0' }}>{notif.stores.join(', ')}</p>
                        <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '0.5rem 0 0 0' }}>📩 {notif.methods}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Panel */}
            <div style={{...styles.card, marginTop: '1.5rem'}}>
              <div style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)', color: 'white', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>📊 État du système</h2>
              </div>
              <div style={styles.cardContent}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>🏪 Magasins surveillés:</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#3b82f6' }}>{stores.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>⭐ Favoris:</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#ef4444' }}>{favoriteStores.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>⏰ Vérifications/jour:</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#8b5cf6' }}>{checkTimes.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>📱 Notifications actives:</span>
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.125rem', 
                      color: getNotificationCount() > 0 ? '#10b981' : '#ef4444' 
                    }}>
                      {getNotificationCount()}/3
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>🔄 Prochaine vérification:</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#f59e0b' }}>
                      {checkTimes.find(time => time > new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })) || checkTimes[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooGoodToGoMonitor;