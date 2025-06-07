const handleSkipClick = (skip) => {
  if (viewMode === "grid") {
    setSelectedSkip(skip);
  } else {
    // In compare mode, toggle selection
    if (compareSkips.find((s) => s.id === skip.id)) {
      setCompareSkips(compareSkips.filter((s) => s.id !== skip.id));
    } else if (compareSkips.length < 3) {
      setCompareSkips([...compareSkips, skip]);
    }
  }
};

const isSkipSelected = (skip) => {
  if (viewMode === "grid") {
    return selectedSkip?.id === skip.id;
  } else {
    return compareSkips.find((s) => s.id === skip.id);
  }
};
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Check,
  Truck,
  Home,
  Weight,
  Package,
  Info,
  Sparkles,
  ArrowLeft,
  Star,
} from "lucide-react";

const SkipSelectionPage = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredSkip, setHoveredSkip] = useState(null);
  const [compareSkips, setCompareSkips] = useState([]);

  useEffect(() => {
    fetchSkips();
  }, []);

  const fetchSkips = async () => {
    try {
      const response = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );
      const data = await response.json();
      setSkips(data.sort((a, b) => a.size - b.size));
      setLoading(false);
    } catch (err) {
      setError("Failed to load skip options");
      setLoading(false);
    }
  };

  const calculateTotalPrice = (skip) => {
    const vat = (skip.price_before_vat * skip.vat) / 100;
    return skip.price_before_vat + vat;
  };

  const getSkipDetails = (size) => {
    const details = {
      4: {
        items: "40-60 bin bags",
        ideal: "Small bathroom renovation",
        volume: "3.05m³",
        weight: "4 tonnes",
      },
      6: {
        items: "60-80 bin bags",
        ideal: "Kitchen refurbishment",
        volume: "4.57m³",
        weight: "6 tonnes",
      },
      8: {
        items: "80-100 bin bags",
        ideal: "Full house clearance",
        volume: "6.10m³",
        weight: "8 tonnes",
      },
      10: {
        items: "100-120 bin bags",
        ideal: "Garden landscaping",
        volume: "7.62m³",
        weight: "10 tonnes",
      },
      12: {
        items: "120-140 bin bags",
        ideal: "Large renovation",
        volume: "9.15m³",
        weight: "12 tonnes",
      },
      14: {
        items: "140-160 bin bags",
        ideal: "Commercial clearance",
        volume: "10.67m³",
        weight: "14 tonnes",
      },
      16: {
        items: "160-180 bin bags",
        ideal: "Construction project",
        volume: "12.20m³",
        weight: "16 tonnes",
      },
      20: {
        items: "200+ bin bags",
        ideal: "Major construction",
        volume: "15.24m³",
        weight: "20 tonnes",
      },
      40: {
        items: "400+ bin bags",
        ideal: "Industrial projects",
        volume: "30.48m³",
        weight: "40 tonnes",
      },
    };
    return details[size] || details[8];
  };

  const getPopularityBadge = (size) => {
    if (size === 8) return { text: "Most Popular", color: "bg-orange-500" };
    if (size === 6) return { text: "Best Value", color: "bg-green-500" };
    return null;
  };

  const handleSkipClick = (skip) => {
    if (viewMode === "grid") {
      setSelectedSkip(skip);
    } else {
      // In compare mode, toggle selection
      if (compareSkips.find((s) => s.id === skip.id)) {
        setCompareSkips(compareSkips.filter((s) => s.id !== skip.id));
      } else if (compareSkips.length < 3) {
        setCompareSkips([...compareSkips, skip]);
      }
    }
  };

  const isSkipSelected = (skip) => {
    if (viewMode === "grid") {
      return selectedSkip?.id === skip.id;
    } else {
      return compareSkips.find((s) => s.id === skip.id);
    }
  };

  const steps = [
    { name: "Postcode", icon: "📍", completed: true },
    { name: "Waste Type", icon: "♻️", completed: true },
    { name: "Select Skip", icon: "🚛", active: true },
    { name: "Permit Check", icon: "📋", completed: false },
    { name: "Choose Date", icon: "📅", completed: false },
    { name: "Payment", icon: "💳", completed: false },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading skip options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Progress Bar */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.name} className="flex items-center min-w-max">
                <div className="relative group">
                  <div
                    className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300
                  ${
                    step.completed
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg"
                      : step.active
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-110 animate-pulse"
                      : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                  }
                `}
                  >
                    <span className="text-xl">{step.icon}</span>
                  </div>
                  <span
                    className={`
                  absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap
                  ${
                    step.active
                      ? "text-indigo-600"
                      : step.completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                `}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="relative w-16 sm:w-24 mx-2">
                    <div className="h-0.5 bg-gray-200 rounded-full"></div>
                    <div
                      className={`
                    absolute inset-0 h-0.5 rounded-full transition-all duration-700
                    ${
                      step.completed
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : ""
                    }
                  `}
                      style={{ width: step.completed ? "100%" : "0%" }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Free Delivery & Collection Included
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Find Your Perfect Skip Size
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From small clear-outs to major renovations, we have the right skip
            for you
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg mb-2">
            <button
              onClick={() => {
                setViewMode("grid");
                setCompareSkips([]);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => {
                setViewMode("compare");
                setSelectedSkip(null);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "compare"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Compare Sizes
            </button>
          </div>
          {viewMode === "compare" && (
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-600">
                Select up to 3 skips to compare • {compareSkips.length} selected
              </p>
              {compareSkips.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Click on skip cards below to add them to comparison
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Skip Display */}
        {viewMode === "compare" && compareSkips.length > 0 && (
          <div className="mb-8">
            {/* Comparison Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <th className="px-6 py-4 text-left font-semibold">
                        Feature
                      </th>
                      {compareSkips.map((skip) => (
                        <th
                          key={skip.id}
                          className="px-6 py-4 text-center font-semibold"
                        >
                          {skip.size} Yard Skip
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Price (inc. VAT)
                      </td>
                      {compareSkips.map((skip) => (
                        <td key={skip.id} className="px-6 py-4 text-center">
                          <span className="text-2xl font-bold text-indigo-600">
                            £{calculateTotalPrice(skip).toFixed(0)}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Capacity
                      </td>
                      {compareSkips.map((skip) => (
                        <td
                          key={skip.id}
                          className="px-6 py-4 text-center text-sm"
                        >
                          {getSkipDetails(skip.size).items}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Volume
                      </td>
                      {compareSkips.map((skip) => (
                        <td
                          key={skip.id}
                          className="px-6 py-4 text-center text-sm"
                        >
                          {getSkipDetails(skip.size).volume}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Max Weight
                      </td>
                      {compareSkips.map((skip) => (
                        <td
                          key={skip.id}
                          className="px-6 py-4 text-center text-sm"
                        >
                          {getSkipDetails(skip.size).weight}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Ideal For
                      </td>
                      {compareSkips.map((skip) => (
                        <td
                          key={skip.id}
                          className="px-6 py-4 text-center text-sm"
                        >
                          {getSkipDetails(skip.size).ideal}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Hire Period
                      </td>
                      {compareSkips.map((skip) => (
                        <td
                          key={skip.id}
                          className="px-6 py-4 text-center text-sm"
                        >
                          {skip.hire_period_days} days
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Road Placement
                      </td>
                      {compareSkips.map((skip) => (
                        <td key={skip.id} className="px-6 py-4 text-center">
                          {skip.allowed_on_road ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              <Check className="w-3 h-3" />
                              Allowed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              ✕ Not Allowed
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        Heavy Waste
                      </td>
                      {compareSkips.map((skip) => (
                        <td key={skip.id} className="px-6 py-4 text-center">
                          {skip.allows_heavy_waste ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              <Check className="w-3 h-3" />
                              Permitted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              ✕ Not Permitted
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                      <td className="px-6 py-6 font-medium text-gray-700">
                        Select
                      </td>
                      {compareSkips.map((skip) => (
                        <td key={skip.id} className="px-6 py-6 text-center">
                          <button
                            onClick={() => {
                              setSelectedSkip(skip);
                              setViewMode("grid");
                              setCompareSkips([]);
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Choose This Skip
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div
          className={
            viewMode === "grid" || compareSkips.length === 0
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          }
        >
          {skips.map((skip, index) => {
            const totalPrice = calculateTotalPrice(skip);
            const isSelected = isSkipSelected(skip);
            const details = getSkipDetails(skip.size);
            const badge = getPopularityBadge(skip.size);
            const isHovered = hoveredSkip === skip.id;

            return (
              <div
                key={skip.id}
                onClick={() => handleSkipClick(skip)}
                onMouseEnter={() => setHoveredSkip(skip.id)}
                onMouseLeave={() => setHoveredSkip(null)}
                className={`
                relative group cursor-pointer transition-all duration-500
                ${viewMode === "grid" ? "" : "max-w-4xl mx-auto"}
                ${isSelected && viewMode === "grid" ? "scale-105" : ""}
                ${
                  viewMode === "compare" &&
                  compareSkips.length >= 3 &&
                  !isSelected
                    ? "opacity-50"
                    : ""
                }
              `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`
                relative bg-white rounded-3xl overflow-hidden shadow-xl
                ${
                  isSelected && viewMode === "grid"
                    ? "ring-4 ring-indigo-500 ring-offset-4"
                    : ""
                }
                ${
                  isSelected && viewMode === "compare"
                    ? "ring-4 ring-green-500 ring-offset-4"
                    : ""
                }
                ${viewMode === "compare" ? "" : ""}
              `}
                >
                  {/* Badge */}
                  {badge && (
                    <div
                      className={`absolute top-4 right-4 z-10 ${badge.color} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}
                    >
                      <Star className="w-3 h-3" />
                      {badge.text}
                    </div>
                  )}

                  {/* Skip Visual */}
                  <div
                    className={`relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Animated Skip Container */}
                      <div
                        className={`relative transform transition-all duration-700 ${
                          isHovered ? "rotate-3 scale-110" : ""
                        }`}
                      >
                        <div
                          className={`
                        w-32 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg
                        shadow-2xl transform perspective-1000
                        ${isHovered ? "animate-bounce" : ""}
                      `}
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                            {skip.size}yd
                          </div>
                          {/* 3D Effect */}
                          <div className="absolute -top-2 -left-2 -right-2 h-4 bg-yellow-300 transform skew-x-12"></div>
                          <div className="absolute -top-2 -right-2 w-4 h-full bg-orange-600 transform skew-y-12"></div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-indigo-400 rounded-full animate-float"></div>
                    <div className="absolute bottom-4 right-8 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-2000"></div>
                    <div className="absolute top-1/2 right-4 w-2 h-2 bg-pink-400 rounded-full animate-float animation-delay-4000"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {skip.size} Yard Skip
                        </h3>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            £{totalPrice.toFixed(0)}
                          </span>
                          <span className="text-sm text-gray-500">
                            inc. VAT
                          </span>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-indigo-500" />
                          <span className="text-gray-600">{details.items}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Info className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-600">{details.ideal}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">
                            {skip.hire_period_days} days hire
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Weight className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-600">
                            Max {details.weight}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skip.allowed_on_road && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <Home className="w-3 h-3" />
                            Road OK
                          </span>
                        )}
                        {skip.allows_heavy_waste && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            <Weight className="w-3 h-3" />
                            Heavy Waste
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      className={`
                    w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform
                    ${
                      isSelected
                        ? viewMode === "grid"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                    ${isHovered && !isSelected ? "scale-105" : ""}
                    ${
                      viewMode === "compare" &&
                      compareSkips.length >= 3 &&
                      !isSelected
                        ? "cursor-not-allowed"
                        : ""
                    }
                  `}
                    >
                      {isSelected ? (
                        viewMode === "grid" ? (
                          <span className="flex items-center justify-center gap-2">
                            <Check className="w-5 h-5" />
                            Selected
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Check className="w-5 h-5" />
                            Added to Compare
                          </span>
                        )
                      ) : viewMode === "compare" ? (
                        compareSkips.length >= 3 ? (
                          "Max 3 Skips"
                        ) : (
                          "Add to Compare"
                        )
                      ) : (
                        "Select This Skip"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button className="group w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Waste Type
          </button>

          <div className="text-center">
            {viewMode === "grid" && selectedSkip && (
              <p className="text-sm text-gray-600 mb-2">
                You've selected:{" "}
                <span className="font-semibold text-indigo-600">
                  {selectedSkip.size} Yard Skip
                </span>
              </p>
            )}
            {viewMode === "compare" && compareSkips.length > 0 && (
              <p className="text-sm text-gray-600 mb-2">
                Comparing {compareSkips.length} skip
                {compareSkips.length > 1 ? "s" : ""}
              </p>
            )}
            <button
              disabled={
                viewMode === "grid" ? !selectedSkip : compareSkips.length === 0
              }
              className={`
              group px-12 py-4 rounded-xl font-semibold transition-all duration-300 transform
              flex items-center justify-center gap-3 shadow-xl
              ${
                (viewMode === "grid" && selectedSkip) ||
                (viewMode === "compare" && compareSkips.length > 0)
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-2xl hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
            >
              Continue to Permit Check
              <ChevronRight
                className={`w-5 h-5 transition-transform ${
                  (viewMode === "grid" && selectedSkip) ||
                  (viewMode === "compare" && compareSkips.length > 0)
                    ? "group-hover:translate-x-1"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span>4.9/5 (2,847 reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Licensed Waste Carrier</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>Same Day Delivery Available</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SkipSelectionPage;
