import React, { useEffect, useState } from 'react';
import { fetchSettings, updateSettings } from '../api/adminApi';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        instantFeedback: true,
        timerEnabled: true,
        timerDuration: 60,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchSettings()
            .then(res => setSettings(res.data))
            .catch(err => setError(err.response?.data?.message || 'Failed to load settings'))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            await updateSettings(settings);
            alert('Settings saved!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save settings');
        }
        setSaving(false);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Settings</h1>
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading settings...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="instantFeedback"
                            name="instantFeedback"
                            checked={settings.instantFeedback}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <label htmlFor="instantFeedback" className="text-gray-800 dark:text-gray-200 font-medium">
                            Enable Instant Feedback
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="timerEnabled"
                            name="timerEnabled"
                            checked={settings.timerEnabled}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <label htmlFor="timerEnabled" className="text-gray-800 dark:text-gray-200 font-medium">
                            Enable Timer
                        </label>
                    </div>
                    <div>
                        <label htmlFor="timerDuration" className="block text-gray-800 dark:text-gray-200 font-medium mb-1">
                            Timer Duration (minutes)
                        </label>
                        <input
                            type="number"
                            id="timerDuration"
                            name="timerDuration"
                            value={settings.timerDuration}
                            onChange={handleChange}
                            min="1"
                            className="w-32 px-3 py-2 border border-gray-300 dark:border-blue-900 rounded bg-white dark:bg-blue-950 text-gray-800 dark:text-gray-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 font-semibold disabled:opacity-60"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </form>
            )}
        </div>
    );
}
