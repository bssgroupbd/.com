# Task Master - Todo List Application

A modern, feature-rich todo list application with local storage functionality. Stay organized, track your tasks, and boost your productivity!

## Features

### 📋 Core Functionality
- **Add Tasks**: Quickly add new tasks with a simple input field
- **Categories**: Organize tasks by category (General, Work, Personal, Shopping, Health)
- **Due Dates**: Set and manage due dates for tasks
- **Persistent Storage**: All tasks saved automatically to browser's local storage
- **Real-time Statistics**: View total, completed, and remaining tasks with progress percentage

### ✅ Task Management
- **Check Off Tasks**: Mark tasks as completed with a simple checkbox
- **Edit Tasks**: Modify task text, category, and due date
- **Delete Tasks**: Remove individual tasks or all completed tasks at once
- **Visual Feedback**: Strikethrough text for completed tasks

### 🎯 Filtering & Organization
- **Filter by Status**: View All, Active, or Completed tasks
- **Color-Coded Categories**: Easily identify task types at a glance
- **Smart Empty State**: Helpful message when no tasks match your filter

### 🎨 User Experience
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Smooth Animations**: Slide and fade animations for task interactions
- **Modern UI**: Clean, intuitive interface with professional styling
- **Keyboard Support**: Add tasks by pressing Enter
- **Visual Stats Dashboard**: Monitor your productivity at a glance

## File Structure

```
├── todo-app.html        # Main HTML file
├── todo-styles.css      # Complete styling with animations
├── todo-script.js       # Application logic and local storage
└── TODO-README.md       # Documentation (this file)
```

## How to Use

### Getting Started
1. Open `todo-app.html` in your web browser
2. The app will load any previously saved tasks automatically

### Adding Tasks
1. Type your task in the input field
2. Select a category from the dropdown (optional)
3. Click "Add Task" or press Enter
4. Your task will appear in the list

### Managing Tasks
- **Complete a Task**: Check the checkbox next to the task
- **Edit a Task**: Click the edit button (pencil icon) to modify the task, category, or due date
- **Delete a Task**: Click the delete button (trash icon)
- **Clear All Completed**: Use the "Clear Completed" button to remove all finished tasks

### Filtering Tasks
- **All**: View all tasks
- **Active**: View only uncompleted tasks
- **Completed**: View only completed tasks

## Local Storage

All your tasks are automatically saved to your browser's local storage. This means:
- Tasks persist even after closing the browser
- No internet connection required
- Data is stored locally on your device
- Clearing browser data will remove all tasks

## Categories

- **General** (Indigo) - Default category
- **Work** (Blue) - Work-related tasks
- **Personal** (Pink) - Personal tasks
- **Shopping** (Amber) - Shopping lists
- **Health** (Green) - Health and fitness tasks

## Statistics Dashboard

- **Total Tasks**: Number of all tasks
- **Completed**: Number of finished tasks
- **Remaining**: Number of incomplete tasks
- **Progress**: Completion percentage

## Keyboard Shortcuts

- **Enter**: Add a new task (when focus is in input field)
- **Escape**: Close edit modal (when it's open)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Privacy

Your data stays on your device:
- No external servers used
- No data collection
- Fully private and secure
- You have complete control over your data

## Tips & Tricks

1. **Organize by Category**: Use different categories to group similar tasks
2. **Set Due Dates**: Important tasks can have due dates for better planning
3. **Regular Cleanup**: Use "Clear Completed" to keep your list clean
4. **Check Progress**: Monitor the progress bar to stay motivated
5. **Mobile Friendly**: Access your tasks from any device

## Troubleshooting

### Tasks not saving?
- Check if local storage is enabled in your browser
- Some private browsing modes disable local storage
- Try a different browser

### Lost all tasks?
- Local storage gets cleared if you:
  - Clear your browser's cache/cookies
  - Clear browsing data
  - Use private/incognito mode
- Consider backing up important tasks

## Customization

You can customize the app by editing:
- Colors in `todo-styles.css` (CSS variables at the top)
- Categories in `todo-script.js` (modify the category select options)
- Messages and text in `todo-app.html`

## Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations and gradients
- **JavaScript**: Vanilla JS (no dependencies)
- **Font Awesome**: Icons for UI elements

## Performance

- Lightweight: ~50KB total (with all features)
- Fast load time: <1 second
- Smooth animations
- Optimized for mobile devices
- Minimal memory usage

## Future Enhancements

Potential features for future versions:
- Task subtasks/checklists
- Task tags and advanced filtering
- Task priorities and sorting
- Recurring tasks
- Task notifications
- Dark mode
- Export/import tasks
- Cloud sync
- Collaboration features

## License

This project is open source and available for personal and commercial use.

## Support

For issues or suggestions, please check the code and documentation.

## Made with ❤️

Task Master - Making productivity simple and enjoyable!
