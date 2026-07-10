# 🧾 Acesso à Plataforma Stock — Brindicis

Este documento contém as credenciais e URLs de acesso às interfaces **FrontOffice** e **BackOffice** da plataforma de gestão de stock da Brindicis.

---

## 🌐 URLs de Acesso

- **FrontOffice:**  
  [https://stock.brindicis](https://stock.brindicis)

- **BackOffice:**  
  [https://stock.brindicis/stock](https://stock.brindicis/stock)

---

## 🔐 Credenciais de Acesso

### 📦 FrontOffice

- **Username:** `brindicis_stock`  
- **Password:** `Brindicis2025`

### 🛠️ BackOffice

- **Username:** `brindicis_admin`  
- **Password:** `Brindicis2025Admin`

---

## ⏰ Agendamento Automático (Cronjob)

Para garantir a verificação de reservas com mais de 48h no sistema, adicionar o seguinte cronjob ao servidor:


- **comando** `0 9 * * * cd /caminho/para/a/aplicacao && php artisan reservations:check-old >> /dev/null 2>&1**`


---

## 👨‍💻 Desenvolvido por

**Diogo Godinho**

---

