export const searchAssets = (assets, searchTerm) => {
  return assets.filter(asset => {
    const searchString = (asset.name || asset.symbol || '').toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
};

export const filterAssetsByDate = (assets, startDate, endDate) => {
  return assets.filter(asset => {
    const purchaseDate = new Date(asset.purchaseDate);
    return purchaseDate >= startDate && purchaseDate <= endDate;
  });
};

export const sortAssets = (assets, sortBy = 'value', order = 'desc') => {
  return [...assets].sort((a, b) => {
    const valueA = parseFloat(a[sortBy] || 0);
    const valueB = parseFloat(b[sortBy] || 0);
    return order === 'desc' ? valueB - valueA : valueA - valueB;
  });
}; 