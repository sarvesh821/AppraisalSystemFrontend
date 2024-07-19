import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Badge, ListGroup } from "react-bootstrap";
import "./NotificationBell.css";
import { FaBell } from "react-icons/fa";
const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8000/api/notifications/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markNotificationsAsRead = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:8000/api/mark-notifications-as-read/",
        {},
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      setNotifications([]);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (showDropdown) {
      markNotificationsAsRead();
    }
  };

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ backgroundColor: "white", position: "relative" }}
        onClick={toggleDropdown}
      >
        <FaBell size={22} color="grey" />
        {notifications.length > 0 && (
          <Badge
            pill
            bg="danger"
            className="notification-badge"
            style={{
              borderRadius: "50%",
              position: "absolute",
              marginTop: "20px",
              marginRight: "19px",
            }}
          >
            {notifications.length}
          </Badge>
        )}
      </button>
      {showDropdown && (
        <div className="notification-dropdown">
          <div className="dropdown-header">Notifications</div>
          <ListGroup>
            {notifications.map((notification, index) => (
              <ListGroup.Item key={notification.id} style={{ border: "none" }}>
                {index + 1}
                {")."}
                {notification.message}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
