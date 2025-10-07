import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, FileText, ArrowLeft } from 'lucide-react';
import { CreateEventData } from '../../types/event';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateEventData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: 50,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Creating event:', formData);
      
      // Navigate back to events list
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxAttendees' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/events')}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600">Fill in the details to create a new event</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="input-field pl-10"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Event Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="input-field resize-none"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="input-field pl-10"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  className="input-field pl-10"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="input-field pl-10"
                placeholder="Enter event location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Max Attendees */}
          <div>
            <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Attendees *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="maxAttendees"
                name="maxAttendees"
                required
                min="1"
                max="1000"
                className="input-field pl-10"
                placeholder="50"
                value={formData.maxAttendees}
                onChange={handleChange}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Set the maximum number of people who can register for this event
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="flex-1 btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>

        {/* Preview Card */}
        {formData.title && (
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Preview</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{formData.title}</h4>
              {formData.description && (
                <p className="text-gray-600 text-sm mb-3">{formData.description}</p>
              )}
              <div className="space-y-1 text-sm text-gray-600">
                {formData.date && formData.time && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formData.date} at {formData.time}
                  </div>
                )}
                {formData.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {formData.location}
                  </div>
                )}
                {formData.maxAttendees > 0 && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Max {formData.maxAttendees} attendees
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;