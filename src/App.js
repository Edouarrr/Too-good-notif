import React, { useState, useEffect } from 'react';
import { Bell, Plus, Settings, Trash2, Edit3, Check, X, Clock, Mail, MapPin, Euro, Smartphone, MessageCircle, Search, Star, TrendingUp, Heart, Download } from 'lucide-react';

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
    
    // Magasins dans un rayon de 1.2km autour du 88 boulevard Saint-Michel, 75006
    // Zone 0-300m (très proche)
    { name: "Boulangerie Saint-Michel", address: "Boulevard Saint-Michel, 75006 Paris", category: "Boulangerie", distance: "80m", zone: "immediate" },
    { name: "Pomme de Pain", address: "Boulevard Saint-Michel, 75006 Paris", category: "Boulangerie", distance: "100m", zone: "immediate" },
    { name: "La Croissanterie", address: "Boulevard Saint-Michel, 75006 Paris", category: "Boulangerie", distance: "120m", zone: "immediate" },
    { name: "Le Choupinet", address: "1 Boulevard Saint-Michel, 75006 Paris", category: "Restaurant", distance: "150m", zone: "immediate" },
    { name: "Le Rostand", address: "6 Place Edmond Rostand, 75006 Paris", category: "Café", distance: "200m", zone: "immediate" },
    { name: "Le Luxembourg", address: "Place Edmond Rostand, 75006 Paris", category: "Café", distance: "250m", zone: "immediate" },
    { name: "Dalloyau", address: "Place Edmond Rostand, 75006 Paris", category: "Pâtisserie", distance: "250m", zone: "immediate" },
    
    // Zone 300-600m (proche)
    { name: "Le Cercle Luxembourg", address: "Place Edmond Rostand, 75006 Paris", category: "Restaurant", distance: "300m", zone: "proche" },
    { name: "Lina's Sandwiches", address: "Rue Médicis, 75006 Paris", category: "Restaurant", distance: "350m", zone: "proche" },
    { name: "Café Laurent", address: "Rue Gay-Lussac, 75005 Paris", category: "Café", distance: "400m", zone: "proche" },
    { name: "Café de la Sorbonne", address: "Place de la Sorbonne, 75005 Paris", category: "Café", distance: "400m", zone: "proche" },
    { name: "La Crêperie du Luxembourg", address: "Rue Soufflot, 75005 Paris", category: "Crêperie", distance: "450m", zone: "proche" },
    { name: "Les Patios", address: "Place de la Sorbonne, 75005 Paris", category: "Restaurant", distance: "450m", zone: "proche" },
    { name: "L'Écritoire", address: "Place de la Sorbonne, 75005 Paris", category: "Restaurant", distance: "500m", zone: "proche" },
    { name: "Baker's Dozen", address: "Quartier Latin, 75005 Paris", category: "Boulangerie", distance: "500m", zone: "proche" },
    { name: "Le Procope", address: "13 Rue de l'Ancienne Comédie, 75006 Paris", category: "Restaurant", distance: "550m", zone: "proche" },
    
    // Zone 600m-1.2km (étendue)
    { name: "Boulangerie Mouffetard", address: "Rue Mouffetard, 75005 Paris", category: "Boulangerie", distance: "650m", zone: "etendue" },
    { name: "Café de Flore", address: "172 Boulevard Saint-Germain, 75006 Paris", category: "Café", distance: "700m", zone: "etendue" },
    { name: "Les Deux Magots", address: "6 Place Saint-Germain des Prés, 75006 Paris", category: "Café", distance: "750m", zone: "etendue" },
    { name: "Pierre Hermé Saint-Germain", address: "72 Rue Bonaparte, 75006 Paris", category: "Pâtisserie", distance: "800m", zone: "etendue" },
    { name: "Polidor", address: "41 Rue Monsieur-le-Prince, 75006 Paris", category: "Restaurant", distance: "850m", zone: "etendue" },
    { name: "Brasserie Lipp", address: "151 Boulevard Saint-Germain, 75006 Paris", category: "Restaurant", distance: "900m", zone: "etendue" },
    { name: "L'Ami Jean", address: "27 Rue Malar, 75007 Paris", category: "Restaurant", distance: "950m", zone: "etendue" },
    { name: "Du Pain et des Idées Panthéon", address: "Rue Saint-Jacques, 75005 Paris", category: "Boulangerie", distance: "1000m", zone: "etendue" },
    { name: "Le Comptoir du 6ème", address: "8 Avenue de l'Odéon, 75006 Paris", category: "Restaurant", distance: "1050m", zone: "etendue" },
    { name: "La Grande Épicerie Bon Marché", address: "38 Rue de Sèvres, 75007 Paris", category: "Épicerie", distance: "1100m", zone: "etendue" },
    { name: "Boulangerie Julien Saint-Jacques", address: "Rue Saint-Jacques, 75005 Paris", category: "Boulangerie", distance: "1150m", zone: "etendue" },
    { name: "Angelina Saint-Germain", address: "Boulevard Saint-Germain, 75006 Paris", category: "Salon de thé", distance: "1200m", zone: "etendue" },
    
    // Autres magasins populaires Paris
    { name: "Kayser - Assas", address: "87 rue d'Assas, 75006 Paris", category: "Boulangerie", favorite: true },
    { name: "Maison Louis", address: "Rue Saint-Jacques, 75005 Paris", category: "Pâtisserie", favorite: true },
    { name: "Boulangerie Julien", address: "75 Rue Saint-Antoine, 75004 Paris", category: "Boulangerie" },
    { name: "Breizh Café", address: "109 Rue Vieille du Temple, 75003 Paris", category: "Crêperie" },
    { name: "Du Pain et des Idées", address: "34 Rue Yves Toudic, 75010 Paris", category: "Boulangerie" },
    { name: "L'As du Fallafel", address: "34 Rue des Rosiers, 75004 Paris", category: "Restaurant" },
    { name: "Berthillon", address: "31 Rue Saint-Louis en l'Île, 75004 Paris", category: "Glacier" },
    { name: "Poilâne", address: "8 Rue du Cherche-Midi, 75006 Paris", category: "Boulangerie" },
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
      favorite: false,
      maxNotificationsPerDay: 5,
      notificationsToday: 0
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
      favorite: true,
      maxNotificationsPerDay: 8,
      notificationsToday: 2
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
      favorite: true,
      maxNotificationsPerDay: 3,
      notificationsToday: 1
    },
    {
      id: 4,
      name: "Le Rostand",
      address: "6 Place Edmond Rostand, 75006 Paris",
      available: true,
      price: "4.50",
      quantity: 1,
      pickupTime: "18:30 - 19:30",
      lastCheck: "12:00",
      rating: 4.5,
      category: "Café",
      favorite: false,
      maxNotificationsPerDay: 4,
      notificationsToday: 0
    }
  ]);

  const [checkTimes, setCheckTimes] = useState(["09:00", "12:00", "15:00", "18:00"]);
  const [checkConfig, setCheckConfig] = useState({
    frequency: 30, // minutes
    weekdayStart: "08:00",
    weekdayEnd: "19:00", 
    weekendStart: "11:00",
    weekendEnd: "21:00",
    maxNotificationsPerHour: 3,
    enabled: true
  });
  const [notificationConfig, setNotificationConfig] = useState({
    emails: ["", ""],
    emailsEnabled: [false, false],
    smsPhones: ["", ""],
    smsEnabled: [false, false],
    whatsappPhones: ["", ""],
    whatsappEnabled: [false, false]
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
  const [isMobile, setIsMobile] = useState(false);
  const [showProximityCheck, setShowProximityCheck] = useState(false);
  const [proximityResults, setProximityResults] = useState([]);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    category: "Restaurant"
  });

  const categories = ["Tous", "Chocolaterie", "Boulangerie", "Pâtisserie", "Restaurant", "Café", "Crêperie", "Glacier"];

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // PWA Install prompt
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone;
    
    if (isIOS && !isStandalone) {
      setShowInstallPrompt(true);
    }
  }, []);

  // Styles CSS optimisés mobile
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
      color: 'white',
      padding: isMobile ? '1rem' : '2rem'
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
      gap: isMobile ? '0.5rem' : '1rem'
    },
    headerIcon: {
      background: 'rgba(255,255,255,0.2)',
      padding: isMobile ? '0.5rem' : '0.75rem',
      borderRadius: '0.75rem',
      backdropFilter: 'blur(10px)'
    },
    headerTitle: {
      fontSize: isMobile ? '1.25rem' : '2rem',
      fontWeight: 'bold',
      margin: 0
    },
    headerSubtitle: {
      margin: '0.25rem 0 0 0',
      opacity: 0.9,
      fontSize: isMobile ? '0.875rem' : '1rem'
    },
    headerButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    btn: {
      padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.75rem' : '0.875rem'
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
      padding: isMobile ? '1rem' : '2rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
      gap: isMobile ? '1rem' : '2rem'
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
      padding: isMobile ? '1rem' : '1.5rem'
    },
    cardContent: {
      padding: isMobile ? '1rem' : '1.5rem'
    },
    storeCard: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '2px solid #e2e8f0',
      borderRadius: '0.75rem',
      padding: isMobile ? '1rem' : '1.5rem',
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
      marginBottom: '1rem',
      flexDirection: isMobile ? 'column' : 'row'
    },
    storeInfo: {
      flex: 1,
      width: '100%'
    },
    storeName: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      flexWrap: 'wrap'
    },
    storeTitle: {
      fontSize: isMobile ? '1rem' : '1.25rem',
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
      marginBottom: '1rem',
      fontSize: isMobile ? '0.875rem' : '1rem'
    },
    storeDetails: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
      gap: '0.5rem'
    },
    detailBox: {
      padding: '0.5rem',
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
      flexDirection: isMobile ? 'row' : 'column',
      gap: '0.5rem',
      marginLeft: isMobile ? 0 : '1rem',
      marginTop: isMobile ? '1rem' : 0,
      justifyContent: isMobile ? 'center' : 'flex-start'
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
      padding: isMobile ? '1rem' : '2rem',
      marginBottom: isMobile ? '1rem' : '2rem'
    },
    notificationBox: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
      border: '1px solid #bfdbfe',
      borderRadius: '0.75rem',
      padding: isMobile ? '1rem' : '1.5rem',
      marginBottom: '1rem'
    },
    contactRow: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    contactInput: {
      flex: 1,
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem'
    },
    removeBtn: {
      padding: '0.5rem',
      background: '#fee2e2',
      color: '#dc2626',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer'
    },
    enableBtn: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: '600'
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
      fontSize: isMobile ? '1rem' : '1.125rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    installPrompt: {
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      right: '1rem',
      background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
      color: 'white',
      padding: '1rem',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: showInstallPrompt ? 'block' : 'none'
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
        favorite: false,
        maxNotificationsPerDay: 5,
        notificationsToday: 0
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

  const updateStoreNotificationLimit = (id, newLimit) => {
    setStores(stores.map(store => 
      store.id === id ? { ...store, maxNotificationsPerDay: newLimit } : store
    ));
  };

  const updateEmailConfig = (index, value) => {
    const newEmails = [...notificationConfig.emails];
    newEmails[index] = value;
    setNotificationConfig({...notificationConfig, emails: newEmails});
  };

  const updateSmsPhoneConfig = (index, value) => {
    const newPhones = [...notificationConfig.smsPhones];
    newPhones[index] = value;
    setNotificationConfig({...notificationConfig, smsPhones: newPhones});
  };

  const updateWhatsappPhoneConfig = (index, value) => {
    const newPhones = [...notificationConfig.whatsappPhones];
    newPhones[index] = value;
    setNotificationConfig({...notificationConfig, whatsappPhones: newPhones});
  };

  const copyFromSmsToWhatsapp = (index) => {
    const newPhones = [...notificationConfig.whatsappPhones];
    newPhones[index] = notificationConfig.smsPhones[index];
    setNotificationConfig({...notificationConfig, whatsappPhones: newPhones});
  };

  const checkProximityStores = () => {
    // Filtrer les magasins proches du 88 bd Saint-Michel
    const proximityStores = popularStores.filter(store => store.distance);
    
    // Trier par distance (convertir les distances en nombres pour le tri)
    const sortedStores = proximityStores.sort((a, b) => {
      const distanceA = parseInt(a.distance.replace('m', ''));
      const distanceB = parseInt(b.distance.replace('m', ''));
      return distanceA - distanceB;
    });

    // Simuler les disponibilités pour ces magasins
    const results = sortedStores.map(store => ({
      ...store,
      available: Math.random() > 0.4, // 60% de chance d'être disponible
      price: (Math.random() * 8 + 3).toFixed(2),
      quantity: Math.floor(Math.random() * 4) + 1,
      pickupTime: "18:00 - 19:30",
      lastCheck: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }));

    setProximityResults(results);
    setShowProximityCheck(true);
  };

  const toggleEmailEnabled = (index) => {
    const newEnabled = [...notificationConfig.emailsEnabled];
    newEnabled[index] = !newEnabled[index];
    setNotificationConfig({...notificationConfig, emailsEnabled: newEnabled});
  };

  const toggleSmsEnabled = (index) => {
    const newEnabled = [...notificationConfig.smsEnabled];
    newEnabled[index] = !newEnabled[index];
    setNotificationConfig({...notificationConfig, smsEnabled: newEnabled});
  };

  const toggleWhatsappEnabled = (index) => {
    const newEnabled = [...notificationConfig.whatsappEnabled];
    newEnabled[index] = !newEnabled[index];
    setNotificationConfig({...notificationConfig, whatsappEnabled: newEnabled});
  };

  const simulateCheck = () => {
    // Vérifier si on est dans les heures de surveillance
    if (!checkConfig.enabled || !isInCheckingHours()) {
      alert(`🕐 Surveillance ${!checkConfig.enabled ? 'désactivée' : 'hors horaires'}\n${isWeekend() ? 'Week-end' : 'Semaine'}: ${isWeekend() ? checkConfig.weekendStart + ' - ' + checkConfig.weekendEnd : checkConfig.weekdayStart + ' - ' + checkConfig.weekdayEnd}`);
      return;
    }

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
    
    // Vérifier la limitation des notifications par heure
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const recentNotifications = notifications.filter(notif => {
      const notifTime = new Date();
      const [hours, minutes] = notif.time.split(':');
      notifTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return notifTime.getTime() > oneHourAgo;
    });

    const canSendNotification = recentNotifications.length < checkConfig.maxNotificationsPerHour;
    
    // Filtrer les magasins disponibles qui n'ont pas atteint leur limite quotidienne
    const availableStores = updatedStores.filter(store => 
      store.available && store.notificationsToday < store.maxNotificationsPerDay
    );
    
    const enabledNotifications = notificationConfig.emailsEnabled.some(e => e) || 
                                notificationConfig.smsEnabled.some(s => s) || 
                                notificationConfig.whatsappEnabled.some(w => w);
                                
    if (availableStores.length > 0 && enabledNotifications && canSendNotification) {
      const methods = [];
      if (notificationConfig.emailsEnabled.some(e => e)) methods.push("📧 Email");
      if (notificationConfig.smsEnabled.some(s => s)) methods.push("📱 SMS");
      if (notificationConfig.whatsappEnabled.some(w => w)) methods.push("💬 WhatsApp");
      
      // Incrémenter le compteur de notifications pour ces magasins
      setStores(prev => prev.map(store => 
        availableStores.find(as => as.id === store.id) 
          ? { ...store, notificationsToday: store.notificationsToday + 1 }
          : store
      ));
      
      const newNotification = {
        id: Date.now(),
        time: currentTime,
        stores: availableStores.map(s => s.name),
        message: `${availableStores.length} magasin(s) disponible(s)`,
        methods: methods.join(", ")
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    } else if (updatedStores.filter(s => s.available).length > 0 && enabledNotifications && !canSendNotification) {
      // Notification bloquée par la limitation globale
      console.log(`🚫 Notification bloquée: ${recentNotifications.length}/${checkConfig.maxNotificationsPerHour} notifications dans la dernière heure`);
    } else if (updatedStores.filter(s => s.available).length > 0 && availableStores.length === 0) {
      // Notification bloquée par les limites individuelles des magasins
      console.log('🚫 Notification bloquée: tous les magasins ont atteint leur limite quotidienne');
    }
  };

  const getNotificationCount = () => {
    const emailCount = notificationConfig.emailsEnabled.filter(e => e).length;
    const smsCount = notificationConfig.smsEnabled.filter(s => s).length;
    const whatsappCount = notificationConfig.whatsappEnabled.filter(w => w).length;
    return emailCount + smsCount + whatsappCount;
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

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6; // Dimanche = 0, Samedi = 6
  };

  const isInCheckingHours = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // en minutes depuis minuit
    
    const startTime = isWeekend() ? checkConfig.weekendStart : checkConfig.weekdayStart;
    const endTime = isWeekend() ? checkConfig.weekendEnd : checkConfig.weekdayEnd;
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    return currentTime >= startMinutes && currentTime <= endMinutes;
  };

  const getNextCheckTime = () => {
    if (!checkConfig.enabled) return "Désactivé";
    
    const now = new Date();
    const nextCheck = new Date(now.getTime() + checkConfig.frequency * 60000);
    
    return nextCheck.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const favoriteStores = stores.filter(store => store.favorite);
  const regularStores = stores.filter(store => !store.favorite);

  return (
    <div style={styles.container}>
      {/* PWA Install Prompt pour iPhone */}
      <div style={styles.installPrompt}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Download size={20} />
          <strong>Installer l'app sur votre iPhone</strong>
        </div>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
          Appuyez sur <strong>⬆️ Partager</strong> puis <strong>"Sur l'écran d'accueil"</strong>
        </p>
        <button 
          onClick={() => setShowInstallPrompt(false)}
          style={{ 
            background: 'rgba(255,255,255,0.2)', 
            border: 'none', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Compris
        </button>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              <Bell size={isMobile ? 24 : 32} />
            </div>
            <div>
              <h1 style={styles.headerTitle}>
                {isMobile ? "TooGoodToGo" : "Surveillance Too Good To Go"}
              </h1>
              <p style={styles.headerSubtitle}>
                Ne ratez plus jamais une bonne affaire ! 🍫✨
              </p>
            </div>
          </div>
          <div style={styles.headerButtons}>
            <button
              style={{...styles.btn, ...styles.btnPrimary}}
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={16} />
              {!isMobile && "Paramètres"}
            </button>
            <button
              style={{...styles.btn, ...styles.btnSuccess}}
              onClick={simulateCheck}
            >
              <TrendingUp size={16} />
              {isMobile ? "Vérifier" : "Vérifier maintenant"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '1rem' : '2rem' }}>
        {/* Settings Panel */}
        {showSettings && (
          <div style={styles.settingsPanel}>
            <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
              ⚙️ Paramètres
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
                🔔 Méthodes de notification
              </h3>
              
              {/* Configuration Email (2 adresses) */}
              <div style={styles.notificationBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Mail size={20} style={{ color: '#2563eb' }} />
                  <span style={{ fontWeight: '600', fontSize: '1rem' }}>📧 Notifications Email</span>
                </div>
                
                {[0, 1].map(index => (
                  <div key={index} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                        Email {index + 1}:
                      </span>
                      <button
                        onClick={() => toggleEmailEnabled(index)}
                        style={{
                          ...styles.enableBtn,
                          background: notificationConfig.emailsEnabled[index] ? '#10b981' : '#d1d5db',
                          color: notificationConfig.emailsEnabled[index] ? 'white' : '#6b7280'
                        }}
                      >
                        {notificationConfig.emailsEnabled[index] ? '✅' : '❌'}
                      </button>
                    </div>
                    <input
                      type="email"
                      placeholder={`email${index + 1}@exemple.com`}
                      value={notificationConfig.emails[index]}
                      onChange={(e) => updateEmailConfig(index, e.target.value)}
                      style={styles.input}
                      disabled={!notificationConfig.emailsEnabled[index]}
                    />
                  </div>
                ))}
              </div>

              {/* Configuration SMS (2 numéros) */}
              <div style={{...styles.notificationBox, background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Smartphone size={20} style={{ color: '#059669' }} />
                  <span style={{ fontWeight: '600', fontSize: '1rem' }}>📱 Notifications SMS</span>
                </div>
                
                {[0, 1].map(index => (
                  <div key={index} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                        Téléphone SMS {index + 1}:
                      </span>
                      <button
                        onClick={() => toggleSmsEnabled(index)}
                        style={{
                          ...styles.enableBtn,
                          background: notificationConfig.smsEnabled[index] ? '#10b981' : '#d1d5db',
                          color: notificationConfig.smsEnabled[index] ? 'white' : '#6b7280'
                        }}
                      >
                        {notificationConfig.smsEnabled[index] ? '✅' : '❌'}
                      </button>
                    </div>
                    <input
                      type="tel"
                      placeholder={`+33 6 ${index === 0 ? '12 34 56 78' : '87 65 43 21'}`}
                      value={notificationConfig.smsPhones[index]}
                      onChange={(e) => updateSmsPhoneConfig(index, e.target.value)}
                      style={styles.input}
                      disabled={!notificationConfig.smsEnabled[index]}
                    />
                  </div>
                ))}
              </div>

              {/* Configuration WhatsApp (2 numéros indépendants) */}
              <div style={{...styles.notificationBox, background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', border: '1px solid #5eead4'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <MessageCircle size={20} style={{ color: '#0d9488' }} />
                  <span style={{ fontWeight: '600', fontSize: '1rem' }}>💬 Notifications WhatsApp</span>
                </div>
                
                {[0, 1].map(index => (
                  <div key={index} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                        Téléphone WhatsApp {index + 1}:
                      </span>
                      <button
                        onClick={() => toggleWhatsappEnabled(index)}
                        style={{
                          ...styles.enableBtn,
                          background: notificationConfig.whatsappEnabled[index] ? '#10b981' : '#d1d5db',
                          color: notificationConfig.whatsappEnabled[index] ? 'white' : '#6b7280'
                        }}
                      >
                        {notificationConfig.whatsappEnabled[index] ? '✅' : '❌'}
                      </button>
                      {notificationConfig.smsPhones[index] && (
                        <button
                          onClick={() => copyFromSmsToWhatsapp(index)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            background: '#e0e7ff',
                            color: '#3730a3',
                            border: 'none',
                            borderRadius: '0.25rem',
                            fontSize: '0.65rem',
                            cursor: 'pointer'
                          }}
                          title="Copier depuis SMS"
                        >
                          📋 SMS
                        </button>
                      )}

        {/* Résultats vérification proximité */}
        {showProximityCheck && (
          <div style={styles.settingsPanel}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                📍 Magasins proches - Vérification instantanée
              </h2>
              <button
                onClick={() => setShowProximityCheck(false)}
                style={{
                  padding: '0.5rem',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{...styles.notificationBox, background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '1px solid #a7f3d0', marginBottom: '1rem'}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <MapPin size={20} style={{ color: '#059669' }} />
                <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                  🎯 Rayon 600m depuis 88 bd Saint-Michel
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#047857', margin: 0 }}>
                <strong>{proximityResults.length} magasins</strong> vérifiés, triés du plus proche au plus éloigné.
                <strong> {proximityResults.filter(s => s.available).length} disponible(s)</strong> maintenant !
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {proximityResults.map((store, index) => (
                <div key={index} style={{
                  ...styles.storeCard,
                  ...(store.available ? styles.favoriteCard : {}),
                  border: store.available ? '2px solid #10b981' : '2px solid #d1d5db'
                }}>
                  <div style={styles.storeHeader}>
                    <div style={styles.storeInfo}>
                      <div style={styles.storeName}>
                        <span style={{ fontSize: '1.5rem' }}>{getCategoryEmoji(store.category)}</span>
                        <h3 style={{...styles.storeTitle, color: store.available ? '#059669' : '#6b7280'}}>
                          #{index + 1} {store.name}
                        </h3>
                        <span style={{ 
                          ...styles.badge, 
                          background: '#dcfce7', 
                          color: '#166534',
                          fontWeight: 'bold'
                        }}>
                          📍 {store.distance}
                        </span>
                        <span style={{
                          ...styles.badge,
                          ...(store.available ? styles.badgeAvailable : styles.badgeUnavailable)
                        }}>
                          {store.available ? '✅ DISPONIBLE' : '❌ Rupture'}
                        </span>
                      </div>
                      <div style={styles.storeAddress}>
                        <MapPin size={16} style={{ color: '#3b82f6' }} />
                        <span>{store.address}</span>
                      </div>
                      {store.available && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                          <div style={{...styles.detailBox, ...styles.detailBoxBlue}}>
                            <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>💰 Prix:</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                              <Euro size={16} />
                              <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{store.price}</span>
                            </div>
                          </div>
                          <div style={{...styles.detailBox, ...styles.detailBoxPurple}}>
                            <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>📦 Quantité:</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginTop: '0.25rem' }}>{store.quantity}</div>
                          </div>
                          <div style={{...styles.detailBox, ...styles.detailBoxOrange}}>
                            <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>🕐 Retrait:</div>
                            <div style={{ fontWeight: 'bold', marginTop: '0.25rem', fontSize: '0.875rem' }}>{store.pickupTime}</div>
                          </div>
                          <div style={{...styles.detailBox, ...styles.detailBoxGreen}}>
                            <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>🔄 Vérif:</div>
                            <div style={{ fontWeight: 'bold', marginTop: '0.25rem', fontSize: '1rem' }}>{store.lastCheck}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    {store.available && (
                      <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button
                          style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                          }}
                          onClick={() => {
                            // Simuler l'ajout aux magasins surveillés
                            const newStore = {
                              id: Date.now(),
                              name: store.name,
                              address: store.address,
                              category: store.category,
                              available: store.available,
                              price: store.price,
                              quantity: store.quantity,
                              pickupTime: store.pickupTime,
                              lastCheck: store.lastCheck,
                              rating: (Math.random() * 2 + 3).toFixed(1),
                              favorite: false,
                              maxNotificationsPerDay: 5,
                              notificationsToday: 0
                            };
                            setStores(prev => [...prev, newStore]);
                            alert(`✅ ${store.name} ajouté à vos magasins surveillés !`);
                          }}
                        >
                          ➕ Surveiller
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.75rem', border: '1px solid #bfdbfe' }}>
              <p style={{ fontSize: '0.875rem', color: '#1e40af', margin: 0, lineHeight: '1.4' }}>
                💡 <strong>Astuce :</strong> Cliquez sur "➕ Surveiller" pour ajouter un magasin disponible à votre liste de surveillance permanente.
                Les distances sont calculées à vol d'oiseau depuis le 88 boulevard Saint-Michel.
              </p>
            </div>
          </div>
        )}
                    </div>
                    <input
                      type="tel"
                      placeholder={`+33 6 ${index === 0 ? '11 22 33 44' : '99 88 77 66'}`}
                      value={notificationConfig.whatsappPhones[index]}
                      onChange={(e) => updateWhatsappPhoneConfig(index, e.target.value)}
                      style={styles.input}
                      disabled={!notificationConfig.whatsappEnabled[index]}
                    />
                  </div>
                ))}
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                  💡 <strong>Indépendant des SMS :</strong> Vous pouvez utiliser des numéros différents ou copier depuis SMS
                </p>
              </div>

              {/* Configuration des vérifications */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
                  ⏰ Paramètres de vérification
                </h3>
                
                <div style={{...styles.notificationBox, background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '1px solid #f59e0b'}}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Clock size={20} style={{ color: '#d97706' }} />
                    <span style={{ fontWeight: '600', fontSize: '1rem' }}>🔄 Fréquence de vérification</span>
                    <button
                      onClick={() => setCheckConfig({...checkConfig, enabled: !checkConfig.enabled})}
                      style={{
                        marginLeft: 'auto',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        background: checkConfig.enabled ? '#10b981' : '#d1d5db',
                        color: checkConfig.enabled ? 'white' : '#6b7280',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}
                    >
                      {checkConfig.enabled ? '✅ Activé' : '❌ Désactivé'}
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                        📊 Vérifier toutes les :
                      </label>
                      <select
                        value={checkConfig.frequency}
                        onChange={(e) => setCheckConfig({...checkConfig, frequency: parseInt(e.target.value)})}
                        style={styles.select}
                        disabled={!checkConfig.enabled}
                      >
                        <option value={5}>5 minutes ⚡</option>
                        <option value={15}>15 minutes 🔥</option>
                        <option value={30}>30 minutes ⭐</option>
                        <option value={60}>60 minutes 🕐</option>
                        <option value={120}>120 minutes 😴</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                        🔔 Max notifications/heure :
                      </label>
                      <select
                        value={checkConfig.maxNotificationsPerHour}
                        onChange={(e) => setCheckConfig({...checkConfig, maxNotificationsPerHour: parseInt(e.target.value)})}
                        style={styles.select}
                        disabled={!checkConfig.enabled}
                      >
                        <option value={1}>1 notification/h 🤫</option>
                        <option value={2}>2 notifications/h 😌</option>
                        <option value={3}>3 notifications/h ⭐</option>
                        <option value={5}>5 notifications/h 🔥</option>
                        <option value={10}>10 notifications/h ⚡</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                        📅 Semaine (Lun-Ven) :
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="time"
                          value={checkConfig.weekdayStart}
                          onChange={(e) => setCheckConfig({...checkConfig, weekdayStart: e.target.value})}
                          style={{...styles.input, flex: 1}}
                          disabled={!checkConfig.enabled}
                        />
                        <span style={{ color: '#6b7280' }}>à</span>
                        <input
                          type="time"
                          value={checkConfig.weekdayEnd}
                          onChange={(e) => setCheckConfig({...checkConfig, weekdayEnd: e.target.value})}
                          style={{...styles.input, flex: 1}}
                          disabled={!checkConfig.enabled}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                        🎉 Week-end (Sam-Dim) :
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="time"
                          value={checkConfig.weekendStart}
                          onChange={(e) => setCheckConfig({...checkConfig, weekendStart: e.target.value})}
                          style={{...styles.input, flex: 1}}
                          disabled={!checkConfig.enabled}
                        />
                        <span style={{ color: '#6b7280' }}>à</span>
                        <input
                          type="time"
                          value={checkConfig.weekendEnd}
                          onChange={(e) => setCheckConfig({...checkConfig, weekendEnd: e.target.value})}
                          style={{...styles.input, flex: 1}}
                          disabled={!checkConfig.enabled}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    <p style={{ fontSize: '0.75rem', color: '#92400e', margin: 0, lineHeight: '1.4' }}>
                      💡 <strong>Configuration actuelle :</strong> Vérification toutes les {checkConfig.frequency} minutes, 
                      {new Date().getDay() === 0 || new Date().getDay() === 6 ? ` de ${checkConfig.weekendStart} à ${checkConfig.weekendEnd} (week-end)` : ` de ${checkConfig.weekdayStart} à ${checkConfig.weekdayEnd} (semaine)`}, 
                      maximum {checkConfig.maxNotificationsPerHour} notifications par heure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Zone de proximité */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
                  📍 Magasins proches du 88 bd Saint-Michel
                </h3>
                
                <div style={{...styles.notificationBox, background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '1px solid #a7f3d0'}}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <MapPin size={20} style={{ color: '#059669' }} />
                    <span style={{ fontWeight: '600', fontSize: '1rem' }}>🎯 Rayon 600 mètres</span>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#047857', margin: '0 0 0.5rem 0' }}>
                      <strong>{popularStores.filter(s => s.distance).length} magasins</strong> trouvés dans votre quartier :
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {popularStores.filter(s => s.distance).slice(0, 8).map((store, index) => (
                        <span key={index} style={{ 
                          fontSize: '0.75rem', 
                          background: '#dcfce7', 
                          color: '#166534', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '9999px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          {getCategoryEmoji(store.category)} {store.name.split(' - ')[0]} 
                          <span style={{ color: '#10b981', fontWeight: '600' }}>({store.distance})</span>
                        </span>
                      ))}
                      {popularStores.filter(s => s.distance).length > 8 && (
                        <span style={{ 
                          fontSize: '0.75rem', 
                          background: '#f3f4f6', 
                          color: '#6b7280', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '9999px'
                        }}>
                          +{popularStores.filter(s => s.distance).length - 8} autres...
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <p style={{ fontSize: '0.75rem', color: '#047857', margin: 0, lineHeight: '1.4' }}>
                      💡 <strong>Astuce :</strong> Ces magasins sont tous à moins de 10 minutes à pied ! 
                      Ajoutez-les avec des limites de notifications adaptées à vos habitudes.
                    </p>
                  </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: isMobile ? '1.125rem' : '1.25rem', fontWeight: 'bold', margin: 0 }}>
                      🏪 Magasins surveillés
                    </h2>
                    <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      {stores.length} magasin(s) • {favoriteStores.length} favoris ⭐
                    </p>
                  </div>
                  <button
                    style={{...styles.btn, ...styles.btnPrimary}}
                    onClick={() => setShowAddStore(!showAddStore)}
                  >
                    <Plus size={16} />
                    {!isMobile && "Ajouter"}
                  </button>
                </div>
              </div>

              {showAddStore && (
                <div style={{ padding: isMobile ? '1rem' : '1.5rem', borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)' }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '1rem', color: '#1f2937', fontSize: isMobile ? '1rem' : '1.125rem' }}>
                    ✨ Ajouter un nouveau magasin
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.75rem' : '1rem' }}>
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
                        <label style={{ fontWeight: '500', color: '#374151', fontSize: isMobile ? '0.875rem' : '1rem' }}>Rechercher un magasin</label>
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
                          {filteredStores.slice(0, isMobile ? 5 : 10).map((store, index) => (
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
                                <span style={{ fontSize: '1rem' }}>{getCategoryEmoji(store.category)}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontWeight: '500', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                                    <span style={{ truncate: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{store.name}</span>
                                    {store.favorite && <Heart size={12} style={{ color: '#ef4444', flexShrink: 0 }} />}
                                  </div>
                                  <div style={{ fontSize: '0.875rem', color: '#6b7280', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {store.address}
                                    {store.distance && <span style={{ color: '#10b981', fontWeight: '600', marginLeft: '0.5rem' }}>📍 {store.distance}</span>}
                                  </div>
                                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                                    <span style={{ fontSize: '0.65rem', background: '#f3f4f6', color: '#6b7280', padding: '0.125rem 0.375rem', borderRadius: '9999px' }}>
                                      {store.category}
                                    </span>
                                    {store.distance && (
                                      <span style={{ fontSize: '0.65rem', background: '#dcfce7', color: '#166534', padding: '0.125rem 0.375rem', borderRadius: '9999px' }}>
                                        Proche
                                      </span>
                                    )}
                                  </div>
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
                    
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={addStore}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: '600',
                          flex: isMobile ? '1' : 'none'
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
                          fontWeight: '600',
                          flex: isMobile ? '1' : 'none'
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
                  <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
                    <h3 style={styles.sectionTitle}>
                      <Heart style={{ color: '#ef4444' }} size={20} />
                      ⭐ Mes Favoris
                    </h3>
                    {favoriteStores.map((store) => (
                      <div key={store.id} style={{...styles.storeCard, ...styles.favoriteCard}}>
                        <div style={styles.storeHeader}>
                          <div style={styles.storeInfo}>
                            <div style={styles.storeName}>
                              <span style={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}>{getCategoryEmoji(store.category)}</span>
                              <h3 style={styles.storeTitle}>{store.name}</h3>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Star size={14} style={{ color: '#fbbf24' }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#6b7280' }}>{store.rating}</span>
                              </div>
                              <span style={{...styles.badge, ...styles.badgeCategory, fontSize: '0.65rem'}}>{store.category}</span>
                              <span style={{
                                ...styles.badge,
                                fontSize: '0.65rem',
                                ...(store.available ? styles.badgeAvailable : styles.badgeUnavailable)
                              }}>
                                {store.available ? '✅ Dispo' : '❌ Rupture'}
                              </span>
                            </div>
                            <div style={styles.storeAddress}>
                              <MapPin size={14} style={{ color: '#3b82f6' }} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isMobile ? 'nowrap' : 'normal' }}>
                                {store.address}
                              </span>
                            </div>
                            <div style={styles.storeDetails}>
                              <div style={{...styles.detailBox, ...styles.detailBoxBlue}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>💰 Prix:</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                  <Euro size={14} />
                                  <span style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem' }}>{store.price}</span>
                                </div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxPurple}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>📦 Quantité:</div>
                                <div style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem', marginTop: '0.25rem' }}>{store.quantity}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxOrange}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>🕐 Retrait:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{store.pickupTime}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxGreen}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>🔄 Dernière:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem', fontSize: isMobile ? '0.875rem' : '1rem' }}>{store.lastCheck}</div>
                              </div>
                              <div style={{...styles.detailBox, background: '#fef3c7', color: '#92400e'}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>🔔 Notifs/jour:</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                  <span style={{ fontWeight: 'bold', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                                    {store.notificationsToday}/{store.maxNotificationsPerDay}
                                  </span>
                                </div>
                              </div>
                              <div style={{...styles.detailBox, background: '#e0e7ff', color: '#3730a3'}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.65rem' : '0.75rem' }}>🎯 Limite:</div>
                                <select
                                  value={store.maxNotificationsPerDay}
                                  onChange={(e) => updateStoreNotificationLimit(store.id, parseInt(e.target.value))}
                                  style={{
                                    marginTop: '0.25rem',
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                                    fontWeight: 'bold',
                                    color: '#3730a3',
                                    cursor: 'pointer',
                                    width: '100%'
                                  }}
                                >
                                  <option value={1}>1/jour</option>
                                  <option value={2}>2/jour</option>
                                  <option value={3}>3/jour</option>
                                  <option value={5}>5/jour</option>
                                  <option value={8}>8/jour</option>
                                  <option value={10}>10/jour</option>
                                  <option value={15}>15/jour</option>
                                  <option value={20}>20/jour</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div style={styles.storeActions}>
                            <button
                              onClick={() => toggleFavorite(store.id)}
                              style={{...styles.actionBtn, color: '#ef4444'}}
                            >
                              <Heart size={18} style={{ fill: '#ef4444' }} />
                            </button>
                            <button
                              onClick={() => removeStore(store.id)}
                              style={{...styles.actionBtn, color: '#ef4444'}}
                            >
                              <Trash2 size={18} />
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
                              <span style={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}>{getCategoryEmoji(store.category)}</span>
                              <h3 style={styles.storeTitle}>{store.name}</h3>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Star size={14} style={{ color: '#fbbf24' }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#6b7280' }}>{store.rating}</span>
                              </div>
                              <span style={{...styles.badge, ...styles.badgeCategory, fontSize: '0.65rem'}}>{store.category}</span>
                              <span style={{
                                ...styles.badge,
                                fontSize: '0.65rem',
                                ...(store.available ? styles.badgeAvailable : styles.badgeUnavailable)
                              }}>
                                {store.available ? '✅ Dispo' : '❌ Rupture'}
                              </span>
                            </div>
                            <div style={styles.storeAddress}>
                              <MapPin size={14} style={{ color: '#3b82f6' }} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isMobile ? 'nowrap' : 'normal' }}>
                                {store.address}
                              </span>
                            </div>
                            <div style={styles.storeDetails}>
                              <div style={{...styles.detailBox, ...styles.detailBoxBlue}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>💰 Prix:</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                  <Euro size={14} />
                                  <span style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem' }}>{store.price}</span>
                                </div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxPurple}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>📦 Quantité:</div>
                                <div style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem', marginTop: '0.25rem' }}>{store.quantity}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxOrange}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>🕐 Retrait:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{store.pickupTime}</div>
                              </div>
                              <div style={{...styles.detailBox, ...styles.detailBoxGreen}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>🔄 Dernière:</div>
                                <div style={{ fontWeight: 'bold', marginTop: '0.25rem', fontSize: isMobile ? '0.875rem' : '1rem' }}>{store.lastCheck}</div>
                              </div>
                              <div style={{...styles.detailBox, background: '#fef3c7', color: '#92400e'}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>🔔 Notifs/jour:</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                  <span style={{ fontWeight: 'bold', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                                    {store.notificationsToday}/{store.maxNotificationsPerDay}
                                  </span>
                                </div>
                              </div>
                              <div style={{...styles.detailBox, background: '#e0e7ff', color: '#3730a3'}}>
                                <div style={{ fontWeight: '500', fontSize: isMobile ? '0.65rem' : '0.75rem' }}>🎯 Limite:</div>
                                <select
                                  value={store.maxNotificationsPerDay}
                                  onChange={(e) => updateStoreNotificationLimit(store.id, parseInt(e.target.value))}
                                  style={{
                                    marginTop: '0.25rem',
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                                    fontWeight: 'bold',
                                    color: '#3730a3',
                                    cursor: 'pointer',
                                    width: '100%'
                                  }}
                                >
                                  <option value={1}>1/jour</option>
                                  <option value={2}>2/jour</option>
                                  <option value={3}>3/jour</option>
                                  <option value={5}>5/jour</option>
                                  <option value={8}>8/jour</option>
                                  <option value={10}>10/jour</option>
                                  <option value={15}>15/jour</option>
                                  <option value={20}>20/jour</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div style={styles.storeActions}>
                            <button
                              onClick={() => toggleFavorite(store.id)}
                              style={{...styles.actionBtn, color: '#9ca3af'}}
                            >
                              <Heart size={18} />
                            </button>
                            <button
                              onClick={() => removeStore(store.id)}
                              style={{...styles.actionBtn, color: '#ef4444'}}
                            >
                              <Trash2 size={18} />
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
          <div style={{ order: isMobile ? -1 : 0 }}>
            {/* Notifications Panel */}
            <div style={styles.card}>
              <div style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: 'white', padding: isMobile ? '1rem' : '1.5rem' }}>
                <h2 style={{ fontSize: isMobile ? '1.125rem' : '1.25rem', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bell size={18} />
                  🔔 Notifications
                </h2>
              </div>
              <div style={styles.cardContent}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: isMobile ? '1.5rem 0' : '2rem 0' }}>
                    <Bell size={isMobile ? 36 : 48} style={{ color: '#d1d5db', marginBottom: '0.75rem' }} />
                    <p style={{ color: '#6b7280', margin: '0 0 0.25rem 0', fontSize: isMobile ? '0.875rem' : '1rem' }}>Aucune notification</p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Activez dans paramètres</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {notifications.map((notif) => (
                      <div key={notif.id} style={{
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                        border: '1px solid #a7f3d0',
                        borderRadius: '0.75rem',
                        padding: isMobile ? '0.75rem' : '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065f46', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                          <Bell size={14} />
                          <span>{notif.time}</span>
                        </div>
                        <p style={{ color: '#047857', fontWeight: '500', margin: '0.25rem 0', fontSize: isMobile ? '0.875rem' : '1rem' }}>{notif.message}</p>
                        <p style={{ color: '#059669', fontSize: '0.75rem', margin: '0.25rem 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {notif.stores.join(', ')}
                        </p>
                        <p style={{ fontSize: '0.65rem', color: '#10b981', margin: '0.5rem 0 0 0' }}>📩 {notif.methods}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Panel */}
            <div style={{...styles.card, marginTop: '1.5rem'}}>
              <div style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)', color: 'white', padding: isMobile ? '1rem' : '1.5rem' }}>
                <h2 style={{ fontSize: isMobile ? '1.125rem' : '1.25rem', fontWeight: 'bold', margin: 0 }}>📊 État système</h2>
              </div>
              <div style={styles.cardContent}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.75rem' : '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500', fontSize: isMobile ? '0.875rem' : '1rem' }}>🏪 Magasins:</span>
                    <span style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem', color: '#3b82f6' }}>{stores.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500', fontSize: isMobile ? '0.875rem' : '1rem' }}>⭐ Favoris:</span>
                    <span style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem', color: '#ef4444' }}>{favoriteStores.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500', fontSize: isMobile ? '0.875rem' : '1rem' }}>⏰ Fréquence:</span>
                    <span style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem', color: '#8b5cf6' }}>
                      {checkConfig.enabled ? `${checkConfig.frequency}min` : 'OFF'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500', fontSize: isMobile ? '0.875rem' : '1rem' }}>🎯 Statut:</span>
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: isMobile ? '0.875rem' : '1rem', 
                      color: checkConfig.enabled && isInCheckingHours() ? '#10b981' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      {checkConfig.enabled ? (isInCheckingHours() ? '✅ Actif' : '😴 Hors horaires') : '❌ Désactivé'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500', fontSize: isMobile ? '0.875rem' : '1rem' }}>🛡️ Limite notifs/h:</span>
                    <span style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem', color: '#f59e0b' }}>
                      {checkConfig.maxNotificationsPerHour}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500', fontSize: isMobile ? '0.875rem' : '1rem' }}>📱 Notifs actives:</span>
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: isMobile ? '1rem' : '1.125rem', 
                      color: getNotificationCount() > 0 ? '#10b981' : '#ef4444' 
                    }}>
                      {getNotificationCount()}/6
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500', fontSize: isMobile ? '0.875rem' : '1rem' }}>🔄 Prochaine:</span>
                    <span style={{ fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.125rem', color: '#f59e0b' }}>
                      {getNextCheckTime()}
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