import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Copy, Check } from 'lucide-react';

interface QRCodeViewProps {
  orderId: string;
  driverId: string;
  commentFromShipper: string;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  orderId,
  driverId,
  commentFromShipper
}) => {
  const [copied, setCopied] = useState(false);

  const qrValue = JSON.stringify({ orderId, driverId });

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      {/* Комментарий грузовладельца */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h3 className="text-sm font-medium text-blue-900 mb-1">
          Комментарий грузовладельца:
        </h3>
        <p className="text-sm text-blue-800">{commentFromShipper}</p>
      </div>

      {/* QR-код */}
      <div className="flex flex-col items-center space-y-3">
        <h3 className="text-base font-semibold text-gray-900">
          QR-код для погрузки
        </h3>
        
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
          <QRCode
            value={qrValue}
            size={160}
            level="M"
            includeMargin={true}
            className="block"
          />
        </div>

        {/* Кнопка копирования ID */}
        <div className="flex flex-col items-center space-y-2">
          <p className="text-xs text-gray-600 text-center">
            ID заказа: <span className="font-mono">{orderId}</span>
          </p>
          
          <button
            onClick={handleCopyId}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[40px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать ID</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};