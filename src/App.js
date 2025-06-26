import React, { useState, useEffect } from 'react';
import { Bell, Plus, Settings, Trash2, Edit3, Check, X, Clock, Mail, MapPin, Euro, Smartphone, MessageCircle, Search, Star, TrendingUp, Heart, Download, RefreshCw } from 'lucide-react';

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
  ];

  const categories = ["Tous", "Restaurant", "Boulangerie", "Pâtisserie", "Chocolaterie", "Café", "Crêperie", "Glacier", "Épicerie", "Salon de thé"];

  // États
  const [stores, setStores] = useState([
    { id: 1, name: "Kayser - Assas", address: "87 rue d'Assas, 75006 Paris", category: "Boulangerie", available: true, price: "3.50", quantity: 3, pickupTime: "18:00 - 18:30", lastCheck: "12:30", rating: "4.5", favorite: true, maxNotificationsPerDay: 5, notificationsToday: 2 },
    { id: 2, name: "Maison Louis", address: "Rue Saint-Jacques, 75005 Paris", category: "Pâtisserie", available: false, price: "4.00", quantity: 0, pickupTime: "17:30 - 18:00", lastCheck: "12:30", rating: "4.8", favorite: false, maxNotificationsPerDay: 3, notificationsToday: 1 }
  ]);
  
  const [showSettings, setShowSettings] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [newStore, setNewStore] = useState({ name: "", address: "", category: "Restaurant" });
  const [editingNotificationLimit, setEditingNotificationLimit] = useState(null);
  const [showProximityCheck, setShowProximityCheck] = useState(false);
  const [proximityResults, setProximityResults] = useState([]);
  const [checkingOption, setCheckingOption] = useState('selected'); // 'selected' ou 'proximity'
  const [showInstantCheckModal, setShowInstantCheckModal] = useState(false);
  const [instantCheckResults, setInstantCheckResults] = useState([]);
  
  const [notificationConfig, setNotificationConfig] = useState({
    emails: ["exemple@email.com", ""],
    emailsEnabled: [true, false],
    smsPhones: ["+33 6 12 34 56 78", ""],
    smsEnabled: [true, false],
    whatsappPhones: ["", ""],
    whatsappEnabled: [false, false],
    pushEnabled: true
  });
  
  const [notifications, setNotifications] = useState([
    { id: 1, time: "11:45", stores: ["Kayser - Assas"], message: "1 magasin disponible", methods: "📧 Email, 📱 SMS" },
    { id: 2, time: "09:30", stores: ["La Maison du Chocolat", "Maison Louis"], message: "2 magasins disponibles", methods: "📧 Email" }
  ]);
  
  const [checkConfig, setCheckConfig] = useState({
    enabled: true,
    frequency: 10,
    weekdayStart: "08:00",
    weekdayEnd: "20:00",
    weekendStart: "09:00",
    weekendEnd: "19:00",
    maxNotificationsPerHour: 5
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterCategory, setFilterCategory] = useState("Tous");
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showNearbyStores, setShowNearbyStores] = useState(false);

  // Détection mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Favoris
  const favoriteStores = stores.filter(store => store.favorite);

  // PWA Installation
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setShowInstallPrompt(true);
    });
  }, []);

  const installPWA = () => {
    setShowInstallPrompt(false);
  };

  // Styles
  const styles = {
    container: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)'
    },
    header: {
      background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: isMobile ? '1rem' : '1.5rem 2rem',
      borderRadius: '0 0 1rem 1rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    content: {
      padding: isMobile ? '1rem' : '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      marginBottom: '2rem',
      overflow: 'hidden'
    },
    cardHeader: {
      padding: isMobile ? '1rem' : '1.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    storeItem: {
      padding: isMobile ? '1rem' : '1.5rem',
      borderBottom: '1px solid #f3f4f6',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    availableBadge: {
      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    unavailableBadge: {
      background: '#e5e7eb',
      color: '#6b7280',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    btn: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    btnPrimary: {
      background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white'
    },
    settingsPanel: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: showSettings || showProximityCheck || showInstantCheckModal ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '2rem'
    },
    settingsContent: {
      background: 'white',
      borderRadius: '1rem',
      padding: isMobile ? '1.5rem' : '2rem',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'border-color 0.2s'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      background: 'white'
    },
    notificationBox: {
      padding: '1rem',
      borderRadius: '0.75rem',
      marginBottom: '1rem'
    },
    suggestions: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'white',
      border: '2px solid #e5e7eb',
      borderTop: 'none',
      borderRadius: '0 0 0.5rem 0.5rem',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    suggestionItem: {
      padding: '0.75rem',
      cursor: 'pointer',
      transition: 'background 0.2s',
      borderBottom: '1px solid #f3f4f6'
    },
    detailBox: {
      flex: 1,
      padding: '0.75rem',
      background: '#f9fafb',
      borderRadius: '0.5rem',
      textAlign: 'center'
    },
    detailBoxGreen: {
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      color: '#047857'
    },
    notificationHistory: {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      padding: '1rem',
      borderRadius: '0.75rem',
      marginBottom: '1.5rem'
    },
    notification: {
      background: 'white',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      marginBottom: '0.5rem',
      border: '1px solid #f59e0b'
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

  // Afficher automatiquement les magasins proches quand on ouvre l'ajout
  useEffect(() => {
    if (showAddStore) {
      setShowNearbyStores(true);
    }
  }, [showAddStore]);

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
      setShowNearbyStores(false);
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

  const getCategoryEmoji = (category) => {
    const emojis = {
      "Chocolaterie": "🍫",
      "Boulangerie": "🥖",
      "Pâtisserie": "🧁",
      "Restaurant": "🍽️",
      "Café": "☕",
      "Crêperie": "🥞",
      "Glacier": "🍦",
      "Épicerie": "🛒",
      "Salon de thé": "🫖"
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
    
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startMinutesTotal = startHours * 60 + startMinutes;
    const endMinutesTotal = endHours * 60 + endMinutes;
    
    return currentTime >= startMinutesTotal && currentTime <= endMinutesTotal;
  };

  const getNotificationCount = () => {
    const emailCount = notificationConfig.emailsEnabled.filter(e => e).length;
    const smsCount = notificationConfig.smsEnabled.filter(s => s).length;
    const whatsappCount = notificationConfig.whatsappEnabled.filter(w => w).length;
    return emailCount + smsCount + whatsappCount;
  };

  // Fonction pour vérifier instantanément les disponibilités
  const instantCheck = () => {
    const currentTime = new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    let results = [];

    if (checkingOption === 'selected') {
      // Vérifier uniquement les magasins sélectionnés
      results = stores.map(store => ({
        ...store,
        available: Math.random() > 0.3,
        quantity: Math.floor(Math.random() * 5) + 1,
        price: (Math.random() * 10 + 2).toFixed(2),
        lastCheck: currentTime
      }));
    } else {
      // Vérifier tous les magasins proches
      const proximityStores = popularStores.filter(store => store.distance);
      const sortedStores = proximityStores.sort((a, b) => {
        const distanceA = parseInt(a.distance.replace('m', ''));
        const distanceB = parseInt(b.distance.replace('m', ''));
        return distanceA - distanceB;
      });

      results = sortedStores.map(store => ({
        ...store,
        available: Math.random() > 0.4,
        price: (Math.random() * 8 + 3).toFixed(2),
        quantity: Math.floor(Math.random() * 4) + 1,
        pickupTime: "18:00 - 19:30",
        lastCheck: currentTime,
        rating: (Math.random() * 2 + 3).toFixed(1)
      }));
    }

    setInstantCheckResults(results);
    setShowInstantCheckModal(true);

    // Mettre à jour les magasins surveillés si c'était une vérification des magasins sélectionnés
    if (checkingOption === 'selected') {
      setStores(results);
    }
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

  // Fonction pour obtenir les magasins proches triés par distance
  const getNearbyStores = () => {
    const nearbyStores = popularStores.filter(store => store.distance);
    return nearbyStores.sort((a, b) => {
      const distanceA = parseInt(a.distance.replace('m', ''));
      const distanceB = parseInt(b.distance.replace('m', ''));
      return distanceA - distanceB;
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', margin: 0 }}>
              🥖 Too Good To Go Monitor
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: isMobile ? '0.875rem' : '1rem' }}>
              Surveillance automatique • {getNotificationCount()} alertes actives
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              style={{...styles.btn, background: 'rgba(255,255,255,0.2)', color: 'white'}}
              onClick={simulateCheck}
            >
              <Bell size={16} />
              {!isMobile && "Tester"}
            </button>
            <button 
              style={{...styles.btn, background: 'rgba(255,255,255,0.2)', color: 'white'}}
              onClick={checkProximityStores}
            >
              <MapPin size={16} />
              {!isMobile && "Proximité"}
            </button>
            <button 
              style={{...styles.btn, background: 'rgba(255,255,255,0.2)', color: 'white'}}
              onClick={() => setShowSettings(true)}
            >
              <Settings size={16} />
              {!isMobile && "Paramètres"}
            </button>
          </div>
        </div>
      </div>

      {/* Notification d'installation PWA */}
      <div style={styles.installPrompt}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ fontSize: '1.125rem' }}>📱 Installer l'application</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', opacity: 0.9 }}>
              Ajoutez Too Good To Go Monitor à votre écran d'accueil
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={installPWA}
              style={{
                padding: '0.5rem 1rem',
                background: 'white',
                color: '#6366f1',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Download size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
              Installer
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              style={{
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Résultats vérification proximité */}
      {showProximityCheck && (
        <div style={styles.settingsPanel}>
          <div style={styles.settingsContent}>
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
                  🎯 Rayon 1.2km depuis 88 bd Saint-Michel
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#047857', margin: 0 }}>
                <strong>{proximityResults.length} magasins</strong> vérifiés, triés du plus proche au plus éloigné.
                <strong> {proximityResults.filter(s => s.available).length} disponible(s)</strong> maintenant !
              </p>
            </div>

            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {proximityResults.map((store, index) => (
                <div key={index} style={{
                  ...styles.storeItem,
                  background: store.available ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '600', fontSize: '1.125rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getCategoryEmoji(store.category)} {store.name}
                        <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#3730a3', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>
                          {store.distance}
                        </span>
                      </h3>
                      <p style={{ margin: '0.25rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                        <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {store.address}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {store.available ? (
                        <span style={styles.availableBadge}>
                          ✓ Disponible • {store.quantity} part(s)
                        </span>
                      ) : (
                        <span style={styles.unavailableBadge}>Épuisé</span>
                      )}
                    </div>
                  </div>

                  {store.available && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '100px' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.75rem', color: '#6b7280' }}>💰 Prix:</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#059669' }}>{store.price}€</div>
                      </div>
                      <div style={{ flex: 1, minWidth: '100px' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.75rem', color: '#6b7280' }}>⭐ Note:</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{store.rating}/5</div>
                      </div>
                      <div style={{ flex: 1, minWidth: '120px' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.75rem', color: '#6b7280' }}>🕐 Retrait:</div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{store.pickupTime}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        {!stores.find(s => s.name === store.name) && (
                          <button
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}
                            onClick={() => {
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
                                rating: store.rating || (Math.random() * 2 + 3).toFixed(1),
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
                        )}
                      </div>
                    </div>
                  )}
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
        </div>
      )}

      {/* Modal de vérification instantanée */}
      {showInstantCheckModal && (
        <div style={styles.settingsPanel}>
          <div style={styles.settingsContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                🔄 Vérification instantanée
              </h2>
              <button
                onClick={() => setShowInstantCheckModal(false)}
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
              <p style={{ fontSize: '0.875rem', color: '#047857', margin: 0 }}>
                <strong>{instantCheckResults.length} magasins</strong> vérifiés.
                <strong> {instantCheckResults.filter(s => s.available).length} disponible(s)</strong> maintenant !
              </p>
            </div>

            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {instantCheckResults.map((store, index) => (
                <div key={index} style={{
                  ...styles.storeItem,
                  background: store.available ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '600', fontSize: '1.125rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getCategoryEmoji(store.category)} {store.name}
                        {store.distance && (
                          <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#3730a3', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>
                            {store.distance}
                          </span>
                        )}
                      </h3>
                      <p style={{ margin: '0.25rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                        <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {store.address}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {store.available ? (
                        <span style={styles.availableBadge}>
                          ✓ Disponible • {store.quantity} part(s)
                        </span>
                      ) : (
                        <span style={styles.unavailableBadge}>Épuisé</span>
                      )}
                    </div>
                  </div>

                  {store.available && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '100px' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.75rem', color: '#6b7280' }}>💰 Prix:</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#059669' }}>{store.price}€</div>
                      </div>
                      <div style={{ flex: 1, minWidth: '100px' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.75rem', color: '#6b7280' }}>⭐ Note:</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{store.rating}/5</div>
                      </div>
                      <div style={{ flex: 1, minWidth: '120px' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.75rem', color: '#6b7280' }}>🕐 Retrait:</div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{store.pickupTime}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    style={{...styles.btn, ...styles.btnPrimary}}
                    onClick={() => setShowAddStore(!showAddStore)}
                  >
                    <Plus size={16} />
                    {!isMobile && "Ajouter"}
                  </button>
                  <button
                    style={{...styles.btn, background: '#10b981', color: 'white'}}
                    onClick={() => {
                      setCheckingOption('selected');
                      instantCheck();
                    }}
                    title="Vérifier instantanément les magasins surveillés"
                  >
                    <RefreshCw size={16} />
                    {!isMobile && "Vérif. instant."}
                  </button>
                </div>
              </div>
            </div>

            {showAddStore && (
              <div style={{ padding: isMobile ? '1rem' : '1.5rem', borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)' }}>
                <h3 style={{ fontWeight: '600', marginBottom: '1rem', color: '#1f2937', fontSize: isMobile ? '1rem' : '1.125rem' }}>
                  ✨ Ajouter un nouveau magasin
                </h3>

                {/* Affichage des magasins proches */}
                {showNearbyStores && (
                  <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.8)', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#4f46e5', fontSize: '0.875rem' }}>
                      📍 Magasins proches du 88 bd Saint-Michel (triés par distance)
                    </h4>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {getNearbyStores().slice(0, 10).map((store, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '0.5rem',
                            marginBottom: '0.5rem',
                            background: '#f9fafb',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: '1px solid #e5e7eb',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                          onClick={() => selectStore(store)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f3f4f6';
                            e.currentTarget.style.borderColor = '#6366f1';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>
                              {getCategoryEmoji(store.category)} {store.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.125rem' }}>
                              {store.address}
                            </div>
                          </div>
                          <span style={{
                            fontSize: '0.75rem',
                            background: '#dcfce7',
                            color: '#166534',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontWeight: '600'
                          }}>
                            {store.distance}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', margin: 0 }}>
                      💡 Cliquez sur un magasin pour le sélectionner automatiquement
                    </p>
                  </div>
                )}

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
                            style={styles.suggestionItem}
                            onClick={() => selectStore(store)}
                            onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                            onMouseLeave={(e) => e.target.style.background = 'white'}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ fontWeight: '500' }}>
                                  {getCategoryEmoji(store.category)} {store.name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.125rem' }}>
                                  {store.address}
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                <div style={{ textAlign: 'right' }}>
                                  <span style={{ fontSize: '0.65rem', background: '#f3f4f6', color: '#6b7280', padding: '0.125rem 0.375rem', borderRadius: '9999px' }}>
                                    {store.category}
                                  </span>
                                  {store.distance && (
                                    <span style={{ fontSize: '0.65rem', background: '#dcfce7', color: '#166534', padding: '0.125rem 0.375rem', borderRadius: '9999px', marginLeft: '0.25rem' }}>
                                      {store.distance}
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
                        setShowNearbyStores(false);
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

            {/* Liste des magasins surveillés */}
            {stores.map(store => (
              <div key={store.id} style={{
                ...styles.storeItem,
                background: store.available ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : store.favorite ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontWeight: '600', fontSize: isMobile ? '1rem' : '1.125rem', margin: 0 }}>
                        {getCategoryEmoji(store.category)} {store.name}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(store.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: store.favorite ? '#f59e0b' : '#d1d5db',
                          fontSize: '1.25rem',
                          padding: 0
                        }}
                      >
                        {store.favorite ? '⭐' : '☆'}
                      </button>
                    </div>
                    <p style={{ margin: '0.25rem 0', color: '#6b7280', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      {store.address}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        ⭐ {store.rating}/5
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        • Dernière vérif: {store.lastCheck}
                      </span>
                      {store.available && (
                        <span style={styles.availableBadge}>
                          ✓ Disponible • {store.quantity} part(s)
                        </span>
                      )}
                      {!store.available && (
                        <span style={styles.unavailableBadge}>Épuisé</span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      onClick={() => setEditingNotificationLimit(store.id)}
                      style={{
                        padding: '0.5rem',
                        background: '#e0e7ff',
                        color: '#4338ca',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}
                    >
                      🔔 {store.notificationsToday}/{store.maxNotificationsPerDay}
                    </button>
                    <button
                      onClick={() => removeStore(store.id)}
                      style={{
                        padding: '0.5rem',
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {editingNotificationLimit === store.id && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                      Limite de notifications par jour:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="number"
                        value={store.maxNotificationsPerDay}
                        onChange={(e) => updateStoreNotificationLimit(store.id, parseInt(e.target.value) || 0)}
                        style={{ ...styles.input, width: '80px' }}
                        min="0"
                        max="20"
                      />
                      <button
                        onClick={() => setEditingNotificationLimit(null)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        ✓ OK
                      </button>
                    </div>
                  </div>
                )}

                {store.available && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: isMobile ? '0.5rem' : '1rem', flexWrap: 'wrap' }}>
                    <div style={{...styles.detailBox, background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', color: '#dc2626'}}>
                      <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>💰 Prix:</div>
                      <div style={{ fontWeight: 'bold', marginTop: '0.25rem', fontSize: '1.25rem' }}>{store.price}€</div>
                    </div>
                    <div style={{ flex: 1, padding: '0.75rem', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', borderRadius: '0.5rem', textAlign: 'center' }}>
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
            ))}
          </div>

          {/* Bouton de vérification instantanée pour tous les magasins proches */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'
              }}
              onClick={() => {
                setCheckingOption('proximity');
                instantCheck();
              }}
            >
              <RefreshCw size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Vérifier tous les magasins proches instantanément
            </button>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Vérification immédiate de tous les magasins dans un rayon de 1.2km
            </p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div style={styles.settingsPanel}>
          <div style={styles.settingsContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                ⚙️ Paramètres
              </h2>
              <button
                onClick={() => setShowSettings(false)}
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

            {/* Historique des notifications */}
            <div style={styles.notificationHistory}>
              <h3 style={styles.sectionTitle}>
                <TrendingUp size={20} />
                📊 Historique des notifications
              </h3>
              {notifications.map(notif => (
                <div key={notif.id} style={styles.notification}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>{notif.time}</span>
                    <span style={{ fontSize: '0.75rem', color: '#92400e' }}>{notif.methods}</span>
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
                    {notif.message} • {notif.stores.join(", ")}
                  </p>
                </div>
              ))}
            </div>

            {/* Configuration Email */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={styles.sectionTitle}>
                <Mail size={20} />
                📧 Notifications Email
              </h3>
              {[0, 1].map((index) => (
                <div key={index} style={{ ...styles.notificationBox, background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)', border: '1px solid #a5b4fc' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: '600' }}>Email {index + 1}:</span>
                    <button
                      onClick={() => toggleEmailEnabled(index)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        background: notificationConfig.emailsEnabled[index] ? '#10b981' : '#d1d5db',
                        color: notificationConfig.emailsEnabled[index] ? 'white' : '#6b7280'
                      }}
                    >
                      {notificationConfig.emailsEnabled[index] ? '✅' : '❌'}
                    </button>
                  </div>
                  <input
                    type="email"
                    placeholder={index === 0 ? "exemple@email.com" : "backup@email.com"}
                    value={notificationConfig.emails[index]}
                    onChange={(e) => updateEmailConfig(index, e.target.value)}
                    style={styles.input}
                    disabled={!notificationConfig.emailsEnabled[index]}
                  />
                </div>
              ))}
            </div>

            {/* Configuration SMS */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={styles.sectionTitle}>
                <Smartphone size={20} />
                📱 Notifications SMS
              </h3>
              {[0, 1].map((index) => (
                <div key={index} style={{ ...styles.notificationBox, background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '1px solid #86efac' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: '600' }}>Téléphone {index + 1}:</span>
                    <button
                      onClick={() => toggleSmsEnabled(index)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        background: notificationConfig.smsEnabled[index] ? '#10b981' : '#d1d5db',
                        color: notificationConfig.smsEnabled[index] ? 'white' : '#6b7280'
                      }}
                    >
                      {notificationConfig.smsEnabled[index] ? '✅' : '❌'}
                    </button>
                  </div>
                  <input
                    type="tel"
                    placeholder={`+33 6 ${index === 0 ? '12 34 56 78' : '98 76 54 32'}`}
                    value={notificationConfig.smsPhones[index]}
                    onChange={(e) => updateSmsPhoneConfig(index, e.target.value)}
                    style={styles.input}
                    disabled={!notificationConfig.smsEnabled[index]}
                  />
                </div>
              ))}
            </div>

            {/* Configuration WhatsApp */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={styles.sectionTitle}>
                <MessageCircle size={20} />
                💬 Notifications WhatsApp
              </h3>
              {[0, 1].map((index) => (
                <div key={index} style={{ ...styles.notificationBox, background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '1px solid #86efac' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: '600' }}>WhatsApp {index + 1}:</span>
                    <button
                      onClick={() => toggleWhatsappEnabled(index)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
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
                
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                      Fréquence (minutes):
                    </label>
                    <input
                      type="number"
                      value={checkConfig.frequency}
                      onChange={(e) => setCheckConfig({...checkConfig, frequency: parseInt(e.target.value) || 5})}
                      style={styles.input}
                      min="5"
                      max="60"
                      disabled={!checkConfig.enabled}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                      Max notifications/heure:
                    </label>
                    <input
                      type="number"
                      value={checkConfig.maxNotificationsPerHour}
                      onChange={(e) => setCheckConfig({...checkConfig, maxNotificationsPerHour: parseInt(e.target.value) || 5})}
                      style={styles.input}
                      min="1"
                      max="20"
                      disabled={!checkConfig.enabled}
                    />
                  </div>
                </div>
                
                <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                      🏢 Semaine (Lu-Ve):
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="time"
                        value={checkConfig.weekdayStart}
                        onChange={(e) => setCheckConfig({...checkConfig, weekdayStart: e.target.value})}
                        style={{ ...styles.input, flex: 1 }}
                        disabled={!checkConfig.enabled}
                      />
                      <span style={{ alignSelf: 'center' }}>→</span>
                      <input
                        type="time"
                        value={checkConfig.weekdayEnd}
                        onChange={(e) => setCheckConfig({...checkConfig, weekdayEnd: e.target.value})}
                        style={{ ...styles.input, flex: 1 }}
                        disabled={!checkConfig.enabled}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                      🏖️ Week-end (Sa-Di):
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="time"
                        value={checkConfig.weekendStart}
                        onChange={(e) => setCheckConfig({...checkConfig, weekendStart: e.target.value})}
                        style={{ ...styles.input, flex: 1 }}
                        disabled={!checkConfig.enabled}
                      />
                      <span style={{ alignSelf: 'center' }}>→</span>
                      <input
                        type="time"
                        value={checkConfig.weekendEnd}
                        onChange={(e) => setCheckConfig({...checkConfig, weekendEnd: e.target.value})}
                        style={{ ...styles.input, flex: 1 }}
                        disabled={!checkConfig.enabled}
                      />
                    </div>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.75rem', color: '#92400e', marginTop: '0.75rem', margin: 0 }}>
                  💡 La surveillance s'effectue automatiquement dans ces créneaux horaires
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TooGoodToGoMonitor;
