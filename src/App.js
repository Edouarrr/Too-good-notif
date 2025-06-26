import React, { useState, useEffect } from 'react';
import { Bell, Plus, Settings, Trash2, Edit3, Check, X, Clock, Mail, MapPin, Euro } from 'lucide-react';

const TooGoodToGoMonitor = () => {
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "La Maison du Chocolat",
      address: "225 Rue du Faubourg Saint-Honoré, 75008 Paris",
      available: true,
      price: "4.99",
      quantity: 3,
      pickupTime: "18:00 - 19:30",
      lastCheck: "12:00"
    }
  ]);

  const [checkTimes, setCheckTimes] = useState(["09:00", "12:00", "15:00", "18:00"]);
  const [emailConfig, setEmailConfig] = useState({
    email: "",
    enabled: false
  });
  const [showAddStore, setShowAddStore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingTime, setEditingTime] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [addTimeMode, setAddTimeMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [newStore, setNewStore] = useState({
    name: "",
    address: ""
  });

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
        lastCheck: "12:00"
      };
      setStores([...stores, store]);
      setNewStore({ name: "", address: "" });
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
    if (availableStores.length > 0 && emailConfig.enabled) {
      const newNotification = {
        id: Date.now(),
        time: currentTime,
        stores: availableStores.map(s => s.name),
        message: `${availableStores.length} magasin(s) disponible(s)`
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Bell className="text-green-600" />
                Surveillance Too Good To Go
              </h1>
              <p className="text-gray-600 mt-1">
                Soyez notifié dès qu'il y a des disponibilités dans vos magasins préférés
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Settings size={16} />
                Paramètres
              </button>
              <button
                onClick={simulateCheck}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Vérifier maintenant
              </button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Paramètres</h2>
            
            {/* Email Configuration */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <Mail size={16} />
                Configuration Email
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={emailConfig.email}
                  onChange={(e) => setEmailConfig({...emailConfig, email: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setEmailConfig({...emailConfig, enabled: !emailConfig.enabled})}
                  className={`px-4 py-2 rounded-lg ${
                    emailConfig.enabled 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {emailConfig.enabled ? 'Activé' : 'Désactivé'}
                </button>
              </div>
            </div>

            {/* Check Times Configuration */}
            <div>
              <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                <Clock size={16} />
                Horaires de vérification
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {checkTimes.map((time, index) => (
                  <div key={index} className="flex items-center bg-blue-50 rounded-lg px-3 py-2">
                    {editingTime === time ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="time"
                          defaultValue={time}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="text-sm border-none bg-transparent"
                        />
                        <button
                          onClick={() => updateCheckTime(time, newTime)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingTime(null)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-blue-700 font-medium">{time}</span>
                        <button
                          onClick={() => setEditingTime(time)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit3 size={14} />
                        </button>
                        {checkTimes.length > 1 && (
                          <button
                            onClick={() => removeCheckTime(time)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {addTimeMode ? (
                  <div className="flex items-center bg-green-50 rounded-lg px-3 py-2">
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="text-sm border-none bg-transparent"
                    />
                    <button
                      onClick={addCheckTime}
                      className="ml-2 text-green-600 hover:text-green-700"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setAddTimeMode(false)}
                      className="ml-1 text-red-600 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddTimeMode(true)}
                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 text-gray-600"
                  >
                    <Plus size={14} />
                    Ajouter
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stores List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Magasins surveillés</h2>
                  <button
                    onClick={() => setShowAddStore(!showAddStore)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Ajouter
                  </button>
                </div>
              </div>

              {showAddStore && (
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-medium mb-3">Ajouter un nouveau magasin</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nom du magasin"
                      value={newStore.name}
                      onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Adresse"
                      value={newStore.address}
                      onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addStore}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Ajouter
                      </button>
                      <button
                        onClick={() => setShowAddStore(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="space-y-4">
                  {stores.map((store) => (
                    <div key={store.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{store.name}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                store.available
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {store.available ? 'Disponible' : 'Rupture'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm flex items-center gap-1 mb-2">
                            <MapPin size={14} />
                            {store.address}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Prix:</span>
                              <span className="ml-1 font-medium flex items-center">
                                <Euro size={14} />
                                {store.price}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Quantité:</span>
                              <span className="ml-1 font-medium">{store.quantity}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Retrait:</span>
                              <span className="ml-1 font-medium">{store.pickupTime}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Dernière vérif:</span>
                              <span className="ml-1 font-medium">{store.lastCheck}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeStore(store.id)}
                          className="text-red-600 hover:text-red-700 ml-4"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Panel */}
          <div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Notifications récentes</h2>
              </div>
              <div className="p-6">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Aucune notification pour le moment
                  </p>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-800 font-medium text-sm">
                          <Bell size={14} />
                          {notif.time}
                        </div>
                        <p className="text-green-700 text-sm mt-1">{notif.message}</p>
                        <p className="text-green-600 text-xs mt-1">
                          {notif.stores.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Panel */}
            <div className="bg-white rounded-lg shadow-sm mt-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">État du système</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Magasins surveillés:</span>
                    <span className="font-medium">{stores.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vérifications/jour:</span>
                    <span className="font-medium">{checkTimes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Notifications:</span>
                    <span className={`font-medium ${emailConfig.enabled ? 'text-green-600' : 'text-red-600'}`}>
                      {emailConfig.enabled ? 'Activées' : 'Désactivées'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Prochaine vérification:</span>
                    <span className="font-medium">
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