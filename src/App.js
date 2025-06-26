import React, { useState, useEffect } from 'react';
import { Bell, Plus, Settings, Trash2, Edit3, Check, X, Clock, Mail, MapPin, Euro, Smartphone, MessageCircle, Search, Star, TrendingUp } from 'lucide-react';

const TooGoodToGoMonitor = () => {
  // Liste des magasins populaires à Paris pour l'autocomplétion
  const popularStores = [
    { name: "La Maison du Chocolat", address: "225 Rue du Faubourg Saint-Honoré, 75008 Paris" },
    { name: "Boulangerie Julien", address: "75 Rue Saint-Antoine, 75004 Paris" },
    { name: "Breizh Café", address: "109 Rue Vieille du Temple, 75003 Paris" },
    { name: "Du Pain et des Idées", address: "34 Rue Yves Toudic, 75010 Paris" },
    { name: "Pierre Hermé", address: "72 Rue Bonaparte, 75006 Paris" },
    { name: "L'As du Fallafel", address: "34 Rue des Rosiers, 75004 Paris" },
    { name: "Berthillon", address: "31 Rue Saint-Louis en l'Île, 75004 Paris" },
    { name: "Poilâne", address: "8 Rue du Cherche-Midi, 75006 Paris" },
    { name: "Café de Flore", address: "172 Boulevard Saint-Germain, 75006 Paris" },
    { name: "Ladurée Champs-Élysées", address: "75 Avenue des Champs-Élysées, 75008 Paris" },
    { name: "Le Comptoir du Relais", address: "9 Carrefour de l'Odéon, 75006 Paris" },
    { name: "Bistrot Paul Bert", address: "18 Rue Paul Bert, 75011 Paris" }
  ];

  const [stores, setStores] = useState([
    {
      id: 1,
      name: "La Maison du Chocolat",
      address: "225 Rue du Faubourg Saint-Honoré, 75008 Paris",
      available: true,
      price: "4.99",
      quantity: 3,
      pickupTime: "18:00 - 19:30",
      lastCheck: "12:00",
      rating: 4.8
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

  const [newStore, setNewStore] = useState({
    name: "",
    address: ""
  });

  // Filtrage des magasins pour l'autocomplétion
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = popularStores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredStores([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const selectStore = (store) => {
    setNewStore(store);
    setSearchTerm(store.name);
    setShowSuggestions(false);
  };

  const addStore = () => {
    if (newStore.name && newStore.address) {
      const store = {
        id: Date.now(),
        name: newStore.name,
        address: newStore.address,
        available: Math.random() > 0.5,
        price: (Math.random() * 10 + 2).toFixed(2),
        quantity: Math.floor(Math.random() * 5) + 1,
        pickupTime: "17:30 - 19:00",
        lastCheck: "12:00",
        rating: (Math.random() * 2 + 3).toFixed(1)
      };
      setStores([...stores, store]);
      setNewStore({ name: "", address: "" });
      setSearchTerm("");
      setShowAddStore(false);
    }
  };

  const removeStore = (id) => {
    setStores(stores.filter(store => store.id !== id));
  };

  const addCheckTime = () => {
    if (newTime && !checkTimes.includes(newTime)) {
      const sortedTimes = [...checkTimes, newTime].sort();
      setCheckTimes(sortedTimes);
      setNewTime("");
      setAddTimeMode(false);
    }
  };

  const updateCheckTime = (oldTime, newTime) => {
    if (newTime && !checkTimes.includes(newTime)) {
      const updatedTimes = checkTimes.map(time => 
        time === oldTime ? newTime : time
      ).sort();
      setCheckTimes(updatedTimes);
    }
    setEditingTime(null);
  };

  const removeCheckTime = (timeToRemove) => {
    if (checkTimes.length > 1) {
      setCheckTimes(checkTimes.filter(time => time !== timeToRemove));
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Bell className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  Surveillance Too Good To Go
                </h1>
                <p className="text-white/90 mt-1 text-lg">
                  Ne ratez plus jamais une bonne affaire ! 🍫✨
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Settings size={18} />
                Paramètres
              </button>
              <button
                onClick={simulateCheck}
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <TrendingUp size={18} className="mr-2" />
                Vérifier maintenant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ Paramètres</h2>
            
            {/* Configuration des notifications */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">🔔 Méthodes de notification</h3>
              
              {/* Email */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="text-blue-600" size={20} />
                  <span className="font-medium text-gray-800">Email</span>
                  <button
                    onClick={() => setNotificationConfig({...notificationConfig, emailEnabled: !notificationConfig.emailEnabled})}
                    className={`ml-auto px-4 py-2 rounded-lg transition-all duration-300 ${
                      notificationConfig.emailEnabled 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {notificationConfig.emailEnabled ? '✅ Activé' : '❌ Désactivé'}
                  </button>
                </div>
                <input
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={notificationConfig.email}
                  onChange={(e) => setNotificationConfig({...notificationConfig, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* SMS */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="text-green-600" size={20} />
                  <span className="font-medium text-gray-800">SMS</span>
                  <button
                    onClick={() => setNotificationConfig({...notificationConfig, smsEnabled: !notificationConfig.smsEnabled})}
                    className={`ml-auto px-4 py-2 rounded-lg transition-all duration-300 ${
                      notificationConfig.smsEnabled 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {notificationConfig.smsEnabled ? '✅ Activé' : '❌ Désactivé'}
                  </button>
                </div>
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={notificationConfig.phone}
                  onChange={(e) => setNotificationConfig({...notificationConfig, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* WhatsApp */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-green-600" size={20} />
                  <span className="font-medium text-gray-800">WhatsApp</span>
                  <span className="text-sm text-gray-500">(utilise le même numéro que SMS)</span>
                  <button
                    onClick={() => setNotificationConfig({...notificationConfig, whatsappEnabled: !notificationConfig.whatsappEnabled})}
                    className={`ml-auto px-4 py-2 rounded-lg transition-all duration-300 ${
                      notificationConfig.whatsappEnabled 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {notificationConfig.whatsappEnabled ? '✅ Activé' : '❌ Désactivé'}
                  </button>
                </div>
              </div>
            </div>

            {/* Horaires de vérification */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                <Clock size={20} className="text-purple-600" />
                ⏰ Horaires de vérification
              </h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {checkTimes.map((time, index) => (
                  <div key={index} className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl px-4 py-3 shadow-sm">
                    {editingTime === time ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          defaultValue={time}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="text-sm border-none bg-transparent text-purple-700 font-medium"
                        />
                        <button
                          onClick={() => updateCheckTime(time, newTime)}
                          className="text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingTime(null)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-purple-700 font-semibold text-lg">{time}</span>
                        <button
                          onClick={() => setEditingTime(time)}
                          className="text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        {checkTimes.length > 1 && (
                          <button
                            onClick={() => removeCheckTime(time)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {addTimeMode ? (
                  <div className="flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl px-4 py-3">
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="text-sm border-none bg-transparent text-emerald-700 font-medium"
                    />
                    <button
                      onClick={addCheckTime}
                      className="ml-3 text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setAddTimeMode(false)}
                      className="ml-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddTimeMode(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl px-4 py-3 text-gray-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus size={16} />
                    <span className="font-medium">Ajouter</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Stores List */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">🏪 Magasins surveillés</h2>
                    <p className="text-white/90 mt-1">{stores.length} magasin(s) actif(s)</p>
                  </div>
                  <button
                    onClick={() => setShowAddStore(!showAddStore)}
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>
              </div>

              {showAddStore && (
                <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h3 className="font-semibold mb-4 text-lg text-gray-800">✨ Ajouter un nouveau magasin</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Search size={16} className="text-gray-500" />
                        <label className="font-medium text-gray-700">Rechercher un magasin</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Tapez le nom d'un magasin parisien..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setNewStore({...newStore, name: e.target.value});
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      />
                      
                      {showSuggestions && filteredStores.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                          {filteredStores.map((store, index) => (
                            <button
                              key={index}
                              onClick={() => selectStore(store)}
                              className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium text-gray-800">{store.name}</div>
                              <div className="text-sm text-gray-600">{store.address}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Adresse du magasin"
                      value={newStore.address}
                      onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                    
                    <div className="flex gap-3">
                      <button
                        onClick={addStore}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-105"
                      >
                        ✅ Ajouter
                      </button>
                      <button
                        onClick={() => {
                          setShowAddStore(false);
                          setSearchTerm("");
                          setNewStore({name: "", address: ""});
                        }}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                      >
                        ❌ Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="space-y-4">
                  {stores.map((store) => (
                    <div key={store.id} className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-xl text-gray-900">{store.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star size={16} className="text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-600">{store.rating}</span>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                store.available
                                  ? 'bg-emerald-100 text-emerald-800 shadow-sm'
                                  : 'bg-red-100 text-red-800 shadow-sm'
                              }`}
                            >
                              {store.available ? '✅ Disponible' : '❌ Rupture'}
                            </span>
                          </div>
                          <p className="text-gray-600 flex items-center gap-2 mb-4">
                            <MapPin size={16} className="text-blue-500" />
                            {store.address}
                          </p>
                          <div className="grid grid-cols-2 gap-6 text-sm">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <span className="text-blue-600 font-medium">💰 Prix:</span>
                              <div className="flex items-center mt-1">
                                <Euro size={16} className="text-blue-600" />
                                <span className="font-bold text-lg text-blue-700">{store.price}</span>
                              </div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-3">
                              <span className="text-purple-600 font-medium">📦 Quantité:</span>
                              <div className="font-bold text-lg text-purple-700 mt-1">{store.quantity}</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-3">
                              <span className="text-orange-600 font-medium">🕐 Retrait:</span>
                              <div className="font-bold text-orange-700 mt-1">{store.pickupTime}</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3">
                              <span className="text-green-600 font-medium">🔄 Dernière vérif:</span>
                              <div className="font-bold text-green-700 mt-1">{store.lastCheck}</div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeStore(store.id)}
                          className="text-red-500 hover:text-red-700 ml-6 p-2 rounded-lg hover:bg-red-50 transition-all duration-300"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications Panel */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Bell size={20} />
                  🔔 Notifications récentes
                </h2>
              </div>
              <div className="p-6">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Aucune notification pour le moment</p>
                    <p className="text-sm text-gray-400 mt-1">Activez les notifications dans les paramètres</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                          <Bell size={16} />
                          <span>{notif.time}</span>
                        </div>
                        <p className="text-emerald-700 font-medium mt-1">{notif.message}</p>
                        <p className="text-emerald-600 text-sm mt-1">{notif.stores.join(', ')}</p>
                        <p className="text-xs text-emerald-500 mt-2">📩 {notif.methods}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Panel */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                <h2 className="text-xl font-bold">📊 État du système</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">🏪 Magasins surveillés:</span>
                    <span className="font-bold text-lg text-blue-600">{stores.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">⏰ Vérifications/jour:</span>
                    <span className="font-bold text-lg text-purple-600">{checkTimes.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">📱 Notifications actives:</span>
                    <span className={`font-bold text-lg ${getNotificationCount() > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {getNotificationCount()}/3
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 font-medium">🔄 Prochaine vérification:</span>
                    <span className="font-bold text-lg text-orange-600">
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