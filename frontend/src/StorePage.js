import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiZap,
  FiMail,
  FiArrowLeft,
  FiShoppingCart,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { MdStorefront, MdLocalFireDepartment } from "react-icons/md";

function StorePage() {
  const [banner, setBanner] = useState("Loading...");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/latest-message");
        setBanner(res.data.message);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch {
        setBanner("Welcome to our store!");
      }
    };

    fetchMessage();
    const interval = setInterval(fetchMessage, 3000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99",
      original: "$199",
      emoji: "🎧",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$149",
      original: "$299",
      emoji: "⌚",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: "$59",
      original: "$119",
      emoji: "👟",
    },
    { id: 4, name: "Backpack", price: "$39", original: "$79", emoji: "🎒" },
    { id: 5, name: "Sunglasses", price: "$45", original: "$89", emoji: "🕶️" },
    { id: 6, name: "Water Bottle", price: "$19", original: "$39", emoji: "🍶" },
  ];

  return (
  <div style={{ 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
  minHeight: '100vh', 
  background: '#f8f9fa' 
}}>
  {/* Minimal Navbar */}
  <div style={{
    background: '#ffffff',
    borderBottom: '1px solid #e9ecef',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <MdStorefront style={{ fontSize: '24px', color: '#4a9eff' }} />
      <h1 style={{ 
        margin: 0, 
        fontSize: '20px', 
        fontWeight: '500',
        color: '#212529',
        letterSpacing: '-0.2px'
      }}>
        FutureBlink Store
      </h1>
    </div>
    
    <div style={{ 
      display: 'flex', 
      gap: '28px', 
      fontSize: '14px',
      color: '#6c757d'
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
        <FiHome size={14} /> Home
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
        <FiShoppingBag size={14} /> Products
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
        <FiZap size={14} /> Deals
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
        <FiMail size={14} /> Contact
      </span>
    </div>
    
    <Link to="/" style={{
      background: '#f8f9fa',
      color: '#495057',
      padding: '8px 16px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: '500',
      border: '1px solid #e9ecef',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    }}>
      <FiArrowLeft size={14} /> Back to Dashboard
    </Link>
  </div>

  {/* Banner */}
  <div style={{
    background: '#ffffff',
    borderBottom: '1px solid #e9ecef',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <MdLocalFireDepartment style={{ fontSize: '24px', color: '#f59e0b' }} />
      <span style={{ 
        fontSize: '15px', 
        fontWeight: '500',
        color: '#212529'
      }}>
        {banner}
      </span>
    </div>
    <span style={{
      fontSize: '12px',
      color: '#adb5bd',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }}>
      <FiTrendingUp size={12} /> Live • {lastUpdated}
    </span>
  </div>

  {/* Products Grid */}
  <div style={{ maxWidth: '1000px', margin: '48px auto', padding: '0 24px' }}>
    <h2 style={{ 
      color: '#212529', 
      marginBottom: '28px', 
      fontSize: '20px',
      fontWeight: '500',
      letterSpacing: '-0.2px'
    }}>
      Featured Products
    </h2>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px'
    }}>
      {products.map(p => (
        <div key={p.id} style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '28px 20px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease',
          border: '1px solid #e9ecef',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
          e.currentTarget.style.borderColor = '#dee2e6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
          e.currentTarget.style.borderColor = '#e9ecef';
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {p.icon}
          </div>
          <div style={{ 
            fontWeight: '500', 
            color: '#212529', 
            fontSize: '16px', 
            marginBottom: '8px' 
          }}>
            {p.name}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              color: '#4a9eff', 
              fontWeight: '600', 
              fontSize: '22px' 
            }}>
              {p.price}
            </span>
            <span style={{ 
              color: '#adb5bd', 
              fontSize: '13px', 
              textDecoration: 'line-through' 
            }}>
              {p.original}
            </span>
          </div>
          <div style={{
            background: '#f8f9fa',
            color: '#2b8a3e',
            fontSize: '11px',
            fontWeight: '500',
            padding: '4px 10px',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            margin: '12px 0'
          }}>
            <FiStar size={10} /> 50% OFF
          </div>
          <br />
          <button style={{
            marginTop: '12px',
            background: '#f8f9fa',
            color: '#495057',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '10px 24px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4a9eff';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = '#4a9eff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8f9fa';
            e.currentTarget.style.color = '#495057';
            e.currentTarget.style.borderColor = '#e9ecef';
          }}>
            <FiShoppingCart size={13} /> Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Footer */}
  <div style={{
    textAlign: 'center',
    padding: '28px',
    color: '#adb5bd',
    fontSize: '13px',
    borderTop: '1px solid #e9ecef',
    marginTop: '48px',
    background: '#ffffff'
  }}>
    © 2026 FutureBlink Store — All rights reserved
  </div>
</div>
  );
}

export default StorePage;
